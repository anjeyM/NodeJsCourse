import {Request, Response, NextFunction} from "express";
import * as UserService from "../services/user-service/user.service";
import {User, Group, UserGroup} from '../models';
import {GroupInterface, UserInterface} from '../shared/types/interfaces';
import {addUsersToGroup} from '../transactions/user/user.transactions';

//** Gets all users. */
export const getUsers = async (req: Request, res: Response) => {
  User.findAll({include: Group}).then((users: UserInterface[]) => {
    if (!users) {
      return res.status(500).send("users not found");
    }
    return res.status(200).send(users); 
  }).catch(error => {
    console.log(error);
    return res.status(500).send(error);
  });
}

//** Gets sorted list (by login) of N users. */
export const getSortedUserList = async (req: Request, res: Response, next: NextFunction) => {
  const limit: number = parseInt(req.params.limit);

  User.findAll({include: Group}).then((users: UserInterface[]) => {
    if (!users) {
      return res.status(500).send("users not found");
    }
    const usersLimit: UserInterface[] | null = UserService.getAutoSuggestList(limit, users);
    return res.status(200).send(usersLimit || []); 
  }).catch(error => {
    console.log(error);
    next(error);
    return res.status(500).send(error);
  });
};

//** Gets user by Id. */
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  User.findByPk(req.params.id, {include: Group}).then((user: UserInterface) => {
    if (!user) {
      return res.status(500).send("user not found");
    }
    return res.status(200).send(user); 
  }).catch(error => {
    console.log(error);
    next(error);
    return res.status(500).send(error);
  });
};

//** Creates new user with group info. */
export const setUser = async (req: Request, res: Response, next: NextFunction) => {
  User.create({ ...req.body }).then(async (user: UserInterface) => {
    if(!user) {
      return res.status(500).send('Something went wrong trying to create user.');
    }
    // Add created user to the user permission group (id: 1);
    const savedUserGroup = await addUsersToGroup(user.id, 1);
    if (!savedUserGroup) {
      return res.status(500).send('Something went wrong trying to add user to group.');
    }
    return res.status(201).json(user);
  }).catch(error => {
    console.log(error);
    next(error);
    return res.status(500).send(error);
  })
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
      user_id: user.id,
      group_id: group.id,
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