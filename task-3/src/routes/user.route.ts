import * as express from 'express';
import {getUsers, getSortedUserList, getUser, setUser, updateUser, deleteUser} from '../controllers/user.controller';
import {validateSchema} from '../middleware/validation/validation.middleware';
import {validationSchema} from '../shared/types/interfaces';

export const usersRouter = express.Router();

//** GET users. */
usersRouter.get('/', getUsers);

//** GET users/:n  */
usersRouter.get('/sorted-users/:limit', getSortedUserList);

//** GET user/:id */ 
usersRouter.get('/:id', getUser);

//** POST users */ 
usersRouter.post("/", validateSchema(validationSchema), setUser);

//** PUT user/:id */
usersRouter.put("/:id", validateSchema(validationSchema), updateUser)

//** DELETE user/:id */
usersRouter.delete("/:id", deleteUser)
