import {Request, Response} from "express";
import {Group} from '../models';
import {GroupInterface} from '../shared/types/interfaces';
import {logger} from '../shared/loggers/error-logger';

//** Gets all groups. */
export const getGroups = async (req: Request, res: Response) => {
  Group.findAll().then((groups: GroupInterface[]) => {
    if (!groups) {
      logger.error('Error call updateUser() (groups not found) with args: %O', req.body);
      return res.status(500).send("groups not found");
    }
    return res.status(200).send(groups); 
  }).catch(error => {
    logger.error(`Error: ${error.message} | Method: getGroups() with args: %O`, req.body);
    return res.status(500).send(error);
  });  
}

//** Gets group by Id. */
export const getGroup = async (req: Request, res: Response) => {
  Group.findByPk(req.params.id).then((group: GroupInterface) => {
    if (!group) {
      logger.error('Error call updateUser() (group not found) with args: %O', req.body);
      return res.status(500).send("group not found");
    }
    return res.status(200).send(group); 
  }).catch(error => {
    logger.error(`Error: ${error.message} | Method: getGroup() with args: %O`, req.body);
    return res.status(500).send(error);
  });
};

//** Creates new group. */
export const setGroup = async (req: Request, res: Response) => {
  Group.create({ ...req.body }).then((group: GroupInterface) => {
    if(!group) {
      return res.status(500).send('Something went wrong trying to create group.');
    }
    return res.status(201).json(group);
  }).catch(error => {
    logger.error(`Error: ${error.message} | Method: setGroups() with args: %O`, req.body);
    return res.status(500).send(error);
  })
};

//** Updates group. */
export const updateGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedGroup = await Group.update({ ...req.body }, { where: { id } });

    if (!updatedGroup) {
      logger.error('Error call updateUser() (Something went wrong trying to update the group) with args: %O', req.body);
      return res.status(500).send('Something went wrong trying to update the group.');
    }

    return res.status(201).json(updatedGroup);
    //eslint-disable-next-line
  } catch (error: any) {
    logger.error(`Error: ${error.message} | Method: updateGroup() with args: %O`, req.body);
    return res.status(500).send(error.message);
  }
};

//** Deletes group. */
export const deleteGroup = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedGroup: GroupInterface | null = await Group.findByPk(id);

  if (!deletedGroup) {
    logger.error('Error call updateUser() (There is no group with such Id.) with args: %O', req.body);
    return res.status(500).send('There is no group with such Id.');
  }

  Group.destroy({ where: { id } }).then((response) => {
    if(!response) {
      logger.error('Error call updateUser() (Something went wrong trying to delete the group.) with args: %O', req.body);
      return res.status(500).send('Something went wrong trying to delete the group.');
    }
    return res.status(201).json(deletedGroup);
  }).catch(error => {
    logger.error(`Error: ${error.message} | Method: deleteGroup() with args: %O`, req.body);
    return res.status(500).send(error);
  })
};