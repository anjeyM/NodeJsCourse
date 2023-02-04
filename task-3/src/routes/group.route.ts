import * as express from 'express';
import {getGroups, getGroup, setGroup, updateGroup, deleteGroup} from '../controllers/groups.controller';

export const groupsRouter = express.Router();

//** GET groups. */
groupsRouter.get('/', getGroups);

//** GET group/:id */ 
groupsRouter.get('/:id', getGroup);

//** POST groups */ 
groupsRouter.post("/", setGroup);

//** PUT group/:id */
groupsRouter.put("/:id", updateGroup);

//** DELETE group/:id */
groupsRouter.delete("/:id", deleteGroup);
