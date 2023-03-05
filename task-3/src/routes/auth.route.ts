import * as express from 'express';
import {login} from '../controllers/auth.controller';
import {validateSchema} from '../middleware/validation/validation.middleware';
import {loginValidationSchema} from '../shared/types/interfaces';
import cors from 'cors';

export const authRouter = express.Router();

//** POST auth */ 
authRouter.post("/", cors(), validateSchema(loginValidationSchema), login);
