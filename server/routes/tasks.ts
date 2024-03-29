import { Router } from "express";
import { Counter } from "prom-client";
import  Task from '../models/task'
import User from "../models/user";
import { wrapper } from "./middleware";

const router = Router();

router.get('/', async (req, res) => {
    wrapper(req, res, async () => {
        if (!req.query.userId) {
            return res.status(400).json({message: 'No userId in request'});
        }
        const tasksPromises = (await Task.find({}, 'name reward category _id').sort('reward')).map(async task => {
            const solved = (await User.findOne({_id: req.query.userId}))?.solvedTasks.indexOf(task._id) !== -1;
            return {...task.toObject(), solved};
        });
        const tasks = await Promise.all(tasksPromises);
        res.status(200).json(tasks);
    });
});

router.get('/:id', async (req, res) => {
    wrapper(req, res, async () => {
        const task = await Task.findById(req.params.id, 'name reward category description attachments');
        if (!task) {
            throw new Error(`No task with id ${req.params.id} presented`);
        }
        return res.status(200).json(task.toObject());
    });
})

const taskSubmittedCount = new Counter({
    name: 'task_submitted_count',
    help: 'Task submitted count',
    labelNames: ['result', 'task_name']
})

router.post('/submit', async (req, res) => {
    wrapper(req, res, async () => {
        const {taskId, answer} = req.body;
        const task = await Task.findById(taskId, 'answer reward');
        const user = await User.findById(req.query.userId);
        if (task?.answer !== answer) {
            taskSubmittedCount.inc({result: 'failure', task_name: task?.name});
            return res.status(400).json({message: 'Wrong answer'});
        }
        if (user?.solvedTasks.indexOf(taskId) !== -1) {
            return res.status(400).json({message: 'This task was already solved'});
        }

        user.score += task!.reward;
        user.solvedTasks.push(taskId);
        await user.save();
        taskSubmittedCount.inc({result: 'success', task_name: task?.name});
        return res.status(200).json({});
    })
})


export default router;