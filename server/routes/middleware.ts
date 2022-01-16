import { ErrorRequestHandler, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import config from '../config_loader';

export const logReq: RequestHandler = (req, res, next) => {
    console.log(`New ${req.method} to ${req.path}, body: ${JSON.stringify(req.body)}`);
    next();
}

export const authRequired: RequestHandler = (req, res, next) =>  {
    try {
        const token = req.header('Authorization')?.split(' ')[1]!;
        const good = jwt.verify(token, config.jwtSecret);
        if (good) {
            next();
            return;
        }
        throw new Error('User is not authorized');
    } catch(e) {
        if (e instanceof Error) {
            return res.status(401).json({message: e.message});
        }
    }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err) {
        console.log('Invalid Request data, error: ', err)
        res.status(400).json({ message: 'Invalid request' });
    } else {
        next()
    }
}
