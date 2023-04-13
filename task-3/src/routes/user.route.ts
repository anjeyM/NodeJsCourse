import * as express from 'express';
import UserController from '../controllers/user.controller';
import {validateSchema} from '../middleware/validation/validation.middleware';
import {userValidationSchema, userUpdateValidationSchema} from '../shared/types/interfaces';

export const usersRouter = express.Router();
const controller = new UserController();

//** GET users. */
usersRouter.get('/', async (req, res) => {
    const response = await controller.getUsers(req, res);
    return response;
});

//** GET users/:n  */
usersRouter.get('/sorted-users/:limit', async (req, res, next) => {
    const response = await controller.getSortedUserList(req, res, next);
    return response;
});

//** GET user/:id */ 
usersRouter.get('/:id', async (req, res, next) => {
    const response = await controller.getUser(req, res, next);
    return response;
});

//** POST users */ 
usersRouter.post('/', validateSchema(userValidationSchema), async (req, res, next) => {
    const response = await controller.setUser(req, res, next);
    return response;
});

//** PUT user/:id */
usersRouter.options('/:id');
usersRouter.put('/:id', validateSchema(userUpdateValidationSchema), async (req, res) => {
    const response = await controller.updateUser(req, res);
    return response;
});

//** DELETE user/:id */
usersRouter.options('/:id');
usersRouter.delete('/:id', async (req, res) => {
    const response = await controller.deleteUser(req, res);
    return response;
});

export default usersRouter
