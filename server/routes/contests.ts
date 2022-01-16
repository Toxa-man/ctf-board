import { Router } from "express";
import Contest from "../models/contest";
const router = Router();

router.get('/', async (req, res) => {
    try {
        const contests = await Contest.find({}, 'name');
        return res.status(200).json(contests.map(value => value.toObject()));
    } catch (e) {
        if (e instanceof Error) {
            return res.status(400).json({message: e.message});
        }
    }
})

export default router;