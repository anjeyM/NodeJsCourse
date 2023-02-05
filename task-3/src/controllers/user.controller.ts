import {Request, Response, NextFunction} from "express";
import * as UserService from "../services/user-service/user.service";
import {User, Group, UserGroup} from '../models';
import {GroupInterface, UserInterface} from '../shared/types/interfaces';
import {addUsersToGroup} from '../transactions/user/user.transactions';

//** Gets all users. */
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: UserInterface[] = await User.findAll({
          include: [{model: Group}],
        });
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
      const users: UserInterface[] = await User.findAll();
      const usersLimit: UserInterface[] | null = await UserService.getAutoSuggestList(limit, users);

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
      const user: UserInterface | null = await User.findByPk(id, {
        include: [{
          model: Group,
          as: 'groups',
          required: false,
          attributes: ['id', 'name', 'permissions'],
        }],
      },);
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

//** Creates new user with group info. */
export const setUser = async (req: Request, res: Response) => {
  const user = {
    id: req.body.userId,
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
    isdeleted: req.body.isdeleted,
  };

  const savedUser = await User.create(user);

  if (!savedUser) {
    return res.status(500).send('Something went wrong trying to create user.');
  }

  await Promise.all(await req.body.groups.map(async (groupElement: GroupInterface) => {
    const group = await Group.findByPk(groupElement.id);

    if (!group) {
      return res.status(500).send('One or more of the group ids were invalid');
    }

    const savedUserGroup = await addUsersToGroup(savedUser.id, group.id);

    // Early exit if user group was not saved
    if (!savedUserGroup) {
      return res.status(500).send('Something went wrong trying to create the user group.');
    }
  }));

  return res.status(201).json(savedUser);
};

//** Updates user. */
export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(400).send('User not found');
  }

  const updatedUser = await user.update({
    id: req.body.id || user.id,
    login: req.body.login || user.login,
    password: req.body.password || user.password,
    age: req.body.age || user.age,
    isdeleted: req.body.isdeleted || user.isdeleted,
  }, { where: { id: req.params.id } });

  if (!updatedUser) {
    return res.status(500).send('Something went wrong trying to update user');
  }

  const groups = await user.getGroups();
  user.removeGroups(groups);

  await Promise.all(await req.body.groups.map(async (groupElement: GroupInterface) => {
    const group = await Group.findByPk(groupElement.id);

    const joinedTable = {
      userId: user.id,
      groupId: group.id,
    };

    const savedUserGroup = await UserGroup.create(joinedTable);

    if (!savedUserGroup) {
      return res.status(500).send('Something went wrong trying to update the user. Failed to create user group');
    }
  }));

  return res.status(201).json(updatedUser);
};

//** Deletes user. */
export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);

  const groups = await user.getGroups();
  user.removeGroups(groups);

  const deletedUser = await User.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!deletedUser) {
    return res.status(500).send('There was an error trying to delete the user.');
  }

  return res.status(201).json(deletedUser);
};