import { Router } from "express";
import { wrap } from "yargs";
import User from "../models/user";
import { wrapper } from "./middleware";

const router = Router();

router.get('/', async (req, res) => {
    wrapper(req, res, async () => {
        const result = await User.findOne({_id: req.query.userId}, 'score');
        return res.status(200).json({score: result?.score});
    });
})


router.get('/board', async (req, res) => {
    wrapper(req, res, async () => {
        const user = await User.findOne({_id: req.query.userId}, 'contest');
        const users = await User.find({contest: user?.contest}, 'username score').sort({score: -1});
        return res.status(200).json(users);
    });
})


export default router;