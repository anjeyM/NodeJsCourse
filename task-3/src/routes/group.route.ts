import * as express from 'express';
import {getGroups, getGroup, setGroup, updateGroup, deleteGroup} from '../controllers/groups.controller';
import {validateSchema} from '../middleware/validation/validation.middleware';
import {validationSchema} from '../shared/types/interfaces';

export const groupsRouter = express.Router();

//** GET groups. */
groupsRouter.get('/', getGroups);

//** GET group/:id */ 
groupsRouter.get('/:id', getGroup);

//** POST groups */ 
groupsRouter.post("/", validateSchema(validationSchema), setGroup);

//** PUT group/:id */
groupsRouter.put("/:id", validateSchema(validationSchema), updateGroup);

//** DELETE group/:id */
groupsRouter.delete("/:id", deleteGroup);
