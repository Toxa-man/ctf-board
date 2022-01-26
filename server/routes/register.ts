import {Router} from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user';
import Contest from '../models/contest';
import { wrapper } from './middleware';
import { Counter } from 'prom-client';

const router = Router();

const registrationsCount = new Counter({
    name: 'registrations_count',
    help: 'Count of new successfull registrations',
    labelNames: ['contest']
});


router.post('/', async (req, res) => {
    wrapper(req, res, async () => {
        const {username, password, contestName} = req.body;
        if (await User.exists({username: username})) {
            return res.status(400).json({message: `User with name ${username} already exists`});
        }
        const contest = await Contest.findOne({name: contestName});
        if (!contest) {
            throw new Error(`No such contest ${contestName}`);
        }
        const newUser = new User({
            username: username,
            password: await bcrypt.hash(password, 12),
            score: 0,
            solvedTasks: [],
            contest: contest._id
        });
        newUser.save();
        registrationsCount.inc({contest: contestName});
        return res.status(200).json({});
    });

})

export default router;