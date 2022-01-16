import { Router } from "express";
import User from "../models/user"
import { compare } from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from '../config_loader'

const router = Router();

router.post('/', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username: username});
        if (!user) {
            return res.status(400).json({message: `User ${username} doesn't exists`});
        }

        if (!await compare(password, user.password)) {
            return res.status(400).json({message: `Wrong password`});
        }
        const token = jwt.sign({id: user._id}, config.jwtSecret, {
            expiresIn: '6h'
        });
        return res.status(200).json({userId: user._id, token: token});
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({message: e.message});
        }
    }
});

export default router;
