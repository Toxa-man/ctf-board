import { ErrorRequestHandler, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import config from '../config_loader';
import { Counter } from "prom-client";


const unauthorizedErrors = new Counter({
    name: 'unauth_error_count',
    help: 'Count of unauthorized errors',
    labelNames: ['remoteAddress', 'path', 'method', 'message']
});

const httpRequestsTotal = new Counter({
    name: 'http_requests_total',
    help: 'Count of http requests',
    labelNames: ['path', 'method', 'remoteAddress']
});

export const logReq: RequestHandler = (req, res, next) => {
    console.log(`New ${req.method} to ${req.path}, body: ${JSON.stringify(req.body)}`);
    httpRequestsTotal.inc({path: req.path, method: req.method, remoteAddress: req.socket.remoteAddress});
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
            unauthorizedErrors.inc({
                remoteAddress: req.socket.remoteAddress,
                path: req.path,
                message: e.message,
                method: req.method
            })
            return res.status(401).json({message: e.message});
        }
    }
}

export const httpRedirect: RequestHandler = (req, res, next) => {
    req.secure ? next() : res.redirect(`https://${req.headers.host}${req.url}`);
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err) {
        console.log('Invalid Request data, error: ', err)
        res.status(400).json({ message: 'Invalid request' });
    } else {
        next()
    }
}

const httpErrors = new Counter({
    name: 'http_errors',
    help: 'Count of 400 http errors',
    labelNames: ['method', 'message', 'path']
});

export const wrapper: RequestHandler = async (req, res, callback: any) => {
    try {
        await callback();
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({message: e.message});
            httpErrors.inc({method: req.method, message: e.message, path: req.path});
        }
    }
}

