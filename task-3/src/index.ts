import dotenv from "dotenv";
import express from 'express';
import http from 'http';
import cors from "cors";
import helmet from "helmet";
import {usersRouter} from './routes/user.route';
import {errorHandler} from "./middleware/error/error.middleware";
import {notFoundHandler} from "./middleware/not-found/not-found.middleware";

dotenv.config();

const app = express();

/** App Configuration. */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use(errorHandler);
app.use(notFoundHandler);

/** Server Activation. */
const server = http.createServer(app);
const port = parseInt(process.env.PORT as string, 10) || 3000;
server.listen(port);
app.set('x-powered-by', false);
console.debug('Server listening on port ' + port);