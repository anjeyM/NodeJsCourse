import dotenv from "dotenv";
import express from 'express';
import http from 'http';
import cors from "cors";
import helmet from "helmet";
import * as winston from 'winston';
import {usersRouter} from './routes/user.route';
import {groupsRouter} from './routes/group.route';
import {DB} from './models/db';
import {errorHandler} from "./middleware/error/error.middleware";
import {notFoundHandler} from "./middleware/not-found/not-found.middleware";
import {logger} from './shared/loggers/error-logger';

dotenv.config();

const app = express();

/** App Configuration. */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/groups", groupsRouter);
app.use(notFoundHandler);
app.use(errorHandler);

/** Server Activation. */
const server = http.createServer(app);
const port = parseInt(process.env.PORT as string, 10) || 3100;

server.listen(port, async() => {
  await DB.initDB();
  console.log("Server started on port ", port);
});

process.on('uncaughtException', error => {
  logger.exceptions.handle(
    new winston.transports.File({ filename: 'exceptions.log' })
  );
  logger.info({level: 'error', message: `Uncaught Exception thrown ${error}`});
  process.exit(1);
});
