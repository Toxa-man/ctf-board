import config from "./config_loader";
import { connect } from "mongoose"
import registerRouter from './routes/register'
import authRouter from './routes/auth'
import tasksRouter from './routes/tasks'
import scoreRouter from './routes/score'
import contestsRouter from './routes/contests'
import predefinedRouter from './routes/predefined'

import express from "express"
import { json as jsonParser } from "body-parser";
import { authRequired, errorHandler, logReq } from "./routes/middleware";



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
    app.listen(5000, () => {
        console.log('Server started');
    });
}

main();