import {Request, Response, NextFunction} from "express";
import * as UserService from "../shared/services/user-service/user.service";
import {User, BaseUser} from "../shared/types/interfaces";
import {v4 as uuidv4} from 'uuid';

//** Gets all users. */
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: User[] = await UserService.findAll();
        res.status(200).send(users);
        //eslint-disable-next-line
      } catch (error: any) {
        res.status(500).send(error.message);
        next(error);
      }
}

//** Gets sorted list (by login) of N users. */
export const getSortedUserList = async (req: Request, res: Response, next: NextFunction) => {
    const limit: number = parseInt(req.params.limit);
    
    try {
      const users: User[] | null = await UserService.getAutoSuggestList(limit);

      if (users) {
          return res.status(200).send(users);
      }

      res.status(404).send("users not found");
      //eslint-disable-next-line
    } catch (error: any) {
      res.status(500).send(error.message);
      next(error);
    }
};

//** Gets user by Id. */
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
  
    try {
      const user: User = await UserService.find(id);
  
      if (user) {
        return res.status(200).send(user);
      }
  
      res.status(404).send("user not found");
      //eslint-disable-next-line
    } catch (error: any) {
      res.status(500).send(error.message);
      next(error);
    }
};

//** Creates new user. */
export const setUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: BaseUser = req.body;

    const newItem = await UserService.createUser(user);

    res.status(201).json(newItem);
    //eslint-disable-next-line
  } catch (error: any) {
    res.status(500).send(error.message);
    next(error);
  }
};

//** Updates user. */
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = uuidv4();

  try {
    const userUpdate: User = req.body;
    const existingUser: User = await UserService.find(id);

    if (existingUser) {
      const updatedItem = await UserService.updateUser(id, userUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = await UserService.createUser(userUpdate);

    res.status(201).json(newItem);
    //eslint-disable-next-line
  } catch (error: any) {
    res.status(500).send(error.message);
    next(error);
  }
};

//** Soft deletes user. */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id: string = uuidv4();
    await UserService.deleteUser(id);

    res.sendStatus(204);
    //eslint-disable-next-line
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};