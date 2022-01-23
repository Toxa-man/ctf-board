import config from "./config_loader";
import { connect } from "mongoose"
import registerRouter from './routes/register'
import authRouter from './routes/auth'
import tasksRouter from './routes/tasks'
import scoreRouter from './routes/score'
import contestsRouter from './routes/contests'
import predefinedRouter from './routes/predefined'
import path from 'path'
import https from 'https'
import fs from 'fs'

import express, { Router } from "express"
const subdomain = require('express-subdomain');
import { json as jsonParser } from "body-parser";
import { authRequired, errorHandler, logReq } from "./routes/middleware";

const onListening = () => {
    console.log(`Started ${config.https ? 'https' : 'http'} server on port ${config.httpPort}`);
}

const configRoutes = () => {
    const router = Router();
    router.use([jsonParser(), logReq]);
    router.use(errorHandler);
    router.use('/api/auth', authRouter);
    router.use('/api/register', registerRouter);
    router.use('/api/tasks', authRequired, tasksRouter);
    router.use('/api/score', authRequired, scoreRouter);
    router.use('/api/contests', contestsRouter);
    router.use('/assets', express.static('assets'));
    router.use('/predefined', predefinedRouter);
    return router;
}

async function main() {

    await connect(`mongodb+srv://${config.mongoUsername}:${config.mongoPassword}@${config.mongoDB}`);
    const mainRouter = configRoutes();
    const app = express();
    if (process.env.NODE_ENV === 'production') {
        mainRouter.use(express.static(path.join(__dirname, '../', 'client_static', 'build')));
        mainRouter.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../', 'client_static', 'build', 'index.html'))
        });
        app.use(subdomain('ctf', mainRouter));
    }
    else {
        app.use(mainRouter);
    }
    if (config.https) {
        const privateKey = fs.readFileSync(config.privateKey);
        const certificate = fs.readFileSync(config.certificate);
        https.createServer({
            key: privateKey,
            cert: certificate
        }, app).listen(config.httpPort, onListening);
    } else {
        app.listen(config.httpPort, onListening);
    }

}

main();