import {Request, Response, NextFunction} from "express";
import {Group} from '../models';
import {GroupInterface} from '../shared/types/interfaces';

//** Gets all groups. */
export const getGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups: GroupInterface[] = await Group.findAll();
        return res.status(200).send(groups);
        //eslint-disable-next-line
      } catch (error: any) {
        next(error);
        return res.status(500).send(error.message);
      }
}

//** Gets group by Id. */
export const getGroup = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
  
    try {
      const group: GroupInterface | null = await Group.findByPk(id);
      if (group) {
        return res.status(200).send(group);
      }
  
      return res.status(404).send("group not found");
      //eslint-disable-next-line
    } catch (error: any) {
      next(error);
      return res.status(500).send(error.message);
    }
};

//** Creates new group. */
export const setGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const group: GroupInterface = await Group.create({ ...req.body });
    
    return res.status(201).json(group);
    //eslint-disable-next-line
  } catch (error: any) {
    next(error);
    return res.status(500).send(error.message);
  }
};

//** Updates group. */
export const updateGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await Group.update({ ...req.body }, { where: { id } });
    const updatedGroup: GroupInterface | null = await Group.findByPk(id);

    return res.status(201).json(updatedGroup);
    //eslint-disable-next-line
  } catch (error: any) {
    next(error);
    return res.status(500).send(error.message);
  }
};

//** Deletes group. */
export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedGroup: GroupInterface | null = await Group.findByPk(id);
    await Group.destroy({ where: { id } });

    return res.sendStatus(204).json(deletedGroup);
    //eslint-disable-next-line
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};