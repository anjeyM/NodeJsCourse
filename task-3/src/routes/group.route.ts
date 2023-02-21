import * as express from 'express';
import {getGroups, getGroup, setGroup, updateGroup, deleteGroup} from '../controllers/groups.controller';
import {validateSchema} from '../middleware/validation/validation.middleware';
import {groupValidationSchema} from '../shared/types/interfaces';
import {checkToken} from '../middleware/jwt/check-token.middleware';
import cors from 'cors';

export const groupsRouter = express.Router();

//** GET groups. */
groupsRouter.get('/', cors(), checkToken, getGroups);

//** GET group/:id */ 
groupsRouter.get('/:id', cors(), checkToken, getGroup);

//** POST groups */ 
groupsRouter.post("/", cors(), checkToken, validateSchema(groupValidationSchema), setGroup);

//** PUT group/:id */
groupsRouter.options('/:id', cors());
groupsRouter.put("/:id", checkToken, validateSchema(groupValidationSchema), updateGroup);

//** DELETE group/:id */
groupsRouter.options('/:id', cors());
groupsRouter.delete("/:id", checkToken, deleteGroup);
