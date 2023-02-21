import * as express from 'express';
import {getUsers, getSortedUserList, getUser, setUser, updateUser, deleteUser} from '../controllers/user.controller';
import {validateSchema} from '../middleware/validation/validation.middleware';
import {userValidationSchema} from '../shared/types/interfaces';
import {checkToken} from '../middleware/jwt/check-token.middleware';
import cors from 'cors';

export const usersRouter = express.Router();

//** GET users. */
usersRouter.get('/', cors(), checkToken, getUsers);

//** GET users/:n  */
usersRouter.get('/sorted-users/:limit', cors(), checkToken, getSortedUserList);

//** GET user/:id */ 
usersRouter.get('/:id', cors(), checkToken, getUser);

//** POST users */ 
usersRouter.post("/", cors(), checkToken, validateSchema(userValidationSchema), setUser);

//** PUT user/:id */
usersRouter.options('/:id', cors());
usersRouter.put("/:id", cors(), checkToken, validateSchema(userValidationSchema), updateUser);

//** DELETE user/:id */
usersRouter.options('/:id', cors());
usersRouter.delete("/:id", cors(), checkToken, deleteUser);
