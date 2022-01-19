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

import express from "express"
import { json as jsonParser } from "body-parser";
import { authRequired, errorHandler, logReq } from "./routes/middleware";

const onListening = () => {
    console.log(`Started ${config.https ? 'https' : 'http'} server on port ${config.httpPort}`);
}

async function main() {

    await connect(`mongodb+srv://${config.mongoUsername}:${config.mongoPassword}@${config.mongoDB}`);
    const app = express();
    app.use([jsonParser(), logReq]);
    app.use(errorHandler);
    app.use('/api/auth', authRouter);
    app.use('/api/register', registerRouter);
    app.use('/api/tasks', authRequired, tasksRouter);
    app.use('/api/score', authRequired, scoreRouter);
    app.use('/api/contests', contestsRouter);
    app.use('/assets', express.static('assets'));
    app.use('/predefined', predefinedRouter);
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../', 'client_static')));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../', 'client_static', 'index.html'))
        });
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