import * as express from 'express';
import {getGroups, getGroup, setGroup, updateGroup, deleteGroup} from '../controllers/groups.controller';
import {validateSchema} from '../middleware/validation/validation.middleware';
import {groupValidationSchema, groupUpdateValidationSchema} from '../shared/types/interfaces';

export const groupsRouter = express.Router();

//** GET groups. */
groupsRouter.get('/', getGroups);

//** GET group/:id */ 
groupsRouter.get('/:id', getGroup);

//** POST groups */ 
groupsRouter.post("/", validateSchema(groupValidationSchema), setGroup);

//** PUT group/:id */
groupsRouter.options('/:id');
groupsRouter.put("/:id", validateSchema(groupUpdateValidationSchema), updateGroup);

//** DELETE group/:id */
groupsRouter.options('/:id');
groupsRouter.delete("/:id", deleteGroup);
