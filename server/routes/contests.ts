import { Router } from "express";
import Contest from "../models/contest";
import { wrapper } from "./middleware";
const router = Router();

router.get('/', async (req, res) => {
    wrapper(req, res, async () => {
        const contests = await Contest.find({}, 'name');
        return res.status(200).json(contests.map(value => value.toObject()));
    })
})

export default router;