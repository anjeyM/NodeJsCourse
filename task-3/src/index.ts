import dotenv from "dotenv";
import express from 'express';
import http from 'http';
import cors from "cors";
import helmet from "helmet";
import * as winston from 'winston';
import usersRouter from './routes/user.route';
import {groupsRouter} from './routes/group.route';
import {authRouter} from './routes/auth.route';
import {errorHandler} from "./middleware/error/error.middleware";
import {notFoundHandler} from "./middleware/not-found/not-found.middleware";
import {logger} from './shared/loggers/error-logger';
import {checkToken} from './middleware/jwt/check-token.middleware';

dotenv.config();

export const port = parseInt(process.env.PORT as string, 10) || 3100;

export const app = express();

/** App Configuration. */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/users", checkToken, usersRouter);
app.use("/api/groups", checkToken, groupsRouter);
app.use("/api/login", authRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export const server = http.createServer(app)

process.on('uncaughtException', error => {
  logger.exceptions.handle(
    new winston.transports.File({ filename: 'exceptions.log' })
  );
  logger.info({level: 'error', message: `Uncaught Exception thrown ${error}`});
  process.exit(1);
});
