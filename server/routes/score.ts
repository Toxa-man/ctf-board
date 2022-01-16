import { Router } from "express";
import User from "../models/user";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const result = await User.findOne({_id: req.query.userId}, 'score');
        return res.status(200).json({score: result?.score});
    } catch (e) {
        if (e instanceof Error) {
            return res.status(400).json({message: e.message});
        }
    }
})


router.get('/board', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.query.userId}, 'contest');
        const users = await User.find({contest: user?.contest}, 'username score').sort({score: -1});
        return res.status(200).json(users);
    } catch (e) {
        if (e instanceof Error) {
            return res.status(400).json({message: e.message});
        }
    }
})


export default router;