import {Request, Response, NextFunction} from "express";
import * as UserService from "../services/user-service/user.service";
import {User} from '../models/users';

//** Gets all users. */
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: User[] = await User.findAll();
        return res.status(200).send(users);
        //eslint-disable-next-line
      } catch (error: any) {
        next(error);
        return res.status(500).send(error.message);
      }
}

//** Gets sorted list (by login) of N users. */
export const getSortedUserList = async (req: Request, res: Response, next: NextFunction) => {
    const limit: number = parseInt(req.params.limit);
    
    try {
      const users: User[] = await User.findAll();
      const usersLimit: User[] | null = await UserService.getAutoSuggestList(limit, users);

      if (users) {
          return res.status(200).send(usersLimit);
      }

      res.status(404).send("users not found");
      //eslint-disable-next-line
    } catch (error: any) {
      next(error);
      return res.status(500).send(error.message);
    }
};

//** Gets user by Id. */
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
  
    try {
      const user: User | null = await User.findByPk(id);
      if (user) {
        return res.status(200).send(user);
      }
  
      return res.status(404).send("user not found");
      //eslint-disable-next-line
    } catch (error: any) {
      next(error);
      return res.status(500).send(error.message);
    }
};

//** Creates new user. */
export const setUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = await User.create({ ...req.body });
    
    return res.status(201).json(user);
    //eslint-disable-next-line
  } catch (error: any) {
    next(error);
    return res.status(500).send(error.message);
  }
};

//** Updates user. */
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await User.update({ ...req.body }, { where: { id } });
    const updatedUser: User | null = await User.findByPk(id);

    return res.status(201).json(updatedUser);
    //eslint-disable-next-line
  } catch (error: any) {
    next(error);
    return res.status(500).send(error.message);
  }
};

//** Soft deletes user. */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser: User | null = await User.findByPk(id);
    await User.destroy({ where: { id } });

    return res.sendStatus(204).json(deletedUser);
    //eslint-disable-next-line
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};