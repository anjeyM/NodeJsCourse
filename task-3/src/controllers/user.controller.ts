import {Request, Response, NextFunction} from "express";
import * as UserService from "../services/user-service/user.service";
import {User, Group} from '../models';
import {UserInterface} from '../shared/types/interfaces';
import {addUsersToGroup} from '../transactions/user/user.transactions';
import {logger} from '../shared/loggers/error-logger';

export default class UserController {
  //** Gets all users. */
  public async getUsers(req: Request, res: Response) {
    User.findAll({include: Group}).then((users: UserInterface[]) => {
      if (!users) {
        // logger.error('Error call getUsers(): user not found');
        return res.status(500).send("users not found");
      }
      return res.status(200).send(users); 
    }).catch(error => {
      // logger.error(`Error: ${error.message} | Method: getUsers() with args: %O`, req.body);
      return res.status(500).send(error);
    });
  }

  //** Gets sorted list (by login) of N users. */
  public async getSortedUserList(req: Request, res: Response, next: NextFunction) {
    const limit: number = parseInt(req.params.limit);

    User.findAll({include: Group}).then((users: UserInterface[]) => {
      if (!users) {
        logger.error('Error call findAll(): user not found');
        return res.status(500).send("users not found");
      }
      const usersLimit: UserInterface[] | null = UserService.getAutoSuggestList(limit, users);
      return res.status(200).send(usersLimit || []); 
    }).catch(error => {
      logger.error(`Error: ${error.message} | Method: getSortedUserList() with args: %O`, req.body);
      next(error);
      return res.status(500).send(error);
    });
  }

  //** Gets user by Id. */
  public async getUser(req: Request, res: Response, next: NextFunction) {
    User.findByPk(req.params.id, {include: Group}).then((user: UserInterface) => {
      if (!user) {
        logger.error('Error call getUser(): user not found');
        return res.status(500).send("user not found");
      }
      return res.status(200).send(user); 
    }).catch(error => {
      logger.error(`Error: ${error.message} | Method: getUser() with args: %O`, req.body);
      next(error);
      return res.status(500).send(error);
    });
  }

  //** Creates new user with group info. */
  public async setUser(req: Request, res: Response, next: NextFunction) {
    User.create({ ...req.body }).then(async (user: UserInterface) => {
      if(!user) {
        logger.error('Something went wrong trying to create user.');
        return res.status(500).send('Something went wrong trying to create user.');
      }
      // Add created user to the user permission group (id: 1);
      const savedUserGroup = await addUsersToGroup(1, user.id);
      if (!savedUserGroup) {
        logger.error('Something went wrong trying to add user to group');
        return res.status(500).send('Something went wrong trying to add user to group.');
      }
      return res.status(201).json(user);
    }).catch(error => {
      logger.error(`Error: ${error.message} | Method: setUser() with args: %O`, req.body);
      next(error);
      return res.status(500).send(error);
    })
  }

  //** Updates user. */
  public async updateUser(req: Request, res: Response) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      logger.error('Error call updateUser() (User not found) with args: %O', req.body);
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
      logger.error('Error call updateUser() (Something went wrong trying to update the user) with args: %O', req.body);
      return res.status(500).send('Something went wrong trying to update user');
    }

    // TODO: To think if we need to rewrite user group each time on update
    // const groups = await user.getGroups();
    // user.removeGroups(groups);

    // await Promise.all(await req.body.groups.map(async (groupElement: GroupInterface) => {
    //   const group = await Group.findByPk(groupElement.id);

    //   const joinedTable = {
    //     user_id: user.id,
    //     group_id: group.id,
    //   };

    //   const savedUserGroup = await UserGroup.create(joinedTable);

    //   if (!savedUserGroup) {
    //     logger.error('Error call updateUser() (Something went wrong trying to update the user. Failed to create user group) with args: %O', req.body);
    //     return res.status(500).send('Something went wrong trying to update the user. Failed to create user group');
    //   }
    // })).catch(error => {
    //   logger.error(`Error: ${error.message} | Method: updateUser() with args: %O`, req.body);
    //   return res.status(500).send(error);
    // });

    return res.status(201).json(updatedUser);
  }

  //** Deletes user. */
  public async deleteUser(req: Request, res: Response) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      logger.error('Error call deleteUser() (User not found) with args: %O', req.body);
      return res.status(400).send('User not found');
    }

    const groups = await user.getGroups();
    user.removeGroups(groups);

    const deletedUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedUser) {
      logger.error('Error call deleteUser() with args: %O', req.body);
      return res.status(500).send('There was an error trying to delete the user.');
    }

    return res.status(201).json(deletedUser);
  }
}
