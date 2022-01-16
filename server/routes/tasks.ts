import { Router } from "express";
import  Task from '../models/task'
import User from "../models/user";

const router = Router();

router.get('/', async (req, res) => {
    try {
        if (!req.query.userId) {
            return res.status(400).json({message: 'No userId in request'});
        }
        const tasksPromises = (await Task.find({}, 'name reward category _id')).map(async task => {
            const solved = (await User.findOne({_id: req.query.userId}))?.solvedTasks.indexOf(task._id) !== -1;
            return {...task.toObject(), solved};
        });
        const tasks = await Promise.all(tasksPromises);
        res.status(200).json(tasks);
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({message: e.message});
        }
    }
});

router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id, 'name reward category description attachments');
        if (!task) {
            throw new Error(`No task with id ${req.params.id} presented`);
        }
        return res.status(200).json(task.toObject());
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({message: e.message});
        }
        
    }
})

router.post('/submit', async (req, res) => {
    try {
        const {taskId, answer} = req.body;
        const task = await Task.findById(taskId, 'answer reward');
        const user = await User.findById(req.query.userId);
        if (task?.answer !== answer) {
            return res.status(400).json({message: 'Wrong answer'});
        }
        if (user?.solvedTasks.indexOf(taskId) !== -1) {
            return res.status(400).json({message: 'This task was already solved'});
        }

        user.score += task!.reward;
        user.solvedTasks.push(taskId);
        await user.save();
        return res.status(200).json({});
    } catch (e) {
        if (e instanceof Error) {
            return res.status(400).json({message: e.message});
        }
    }
})


export default router;