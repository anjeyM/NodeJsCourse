import {BaseUser, User, Users} from '../../types/interfaces';
import { v4 as uuidv4 } from 'uuid';

/**
 * In-Memory Store
 */
const users: Users = {
    '1': {
      id: '1',
      login: 'login-1',
      password: 'pass-1',
      age: 20,
      isDeleted: false,
    },
    '3': {
      id: '3',
      login: 'login-3',
      password: 'pass-3',
      age: 20,
      isDeleted: false,
    },
    '2': {
      id: '2',
      login: 'login-2',
      password: 'pass-2',
      age: 20,
      isDeleted: false,
    },
}

//** Findes all users. */
export const findAll = async (): Promise<User[]> => Object.values(users);

//** Findes user by id. */
export const find = async (id: string): Promise<User> => users[id];

//** Creates user. */
export const createUser = async (user: BaseUser): Promise<User> => {
  const id = uuidv4();

  users[id] = {id, ...user};

  return users[id];
};

//** Deletes user. */
export const deleteUser = async (userId: string): Promise<User|null> => {
  const user = await find(userId);

  if (!user) {
    return null;
  }

  user.isDeleted = true;

  return user;
};

//** Updates users. */
export const updateUser = async (id: string, user: BaseUser): Promise<User|null> => {
  const userFromDataBase = await find(id);

  if (!userFromDataBase) {
    return null;
  }

  users[id] = {id, ...user};

  return users[id];
};

//** Gets limit number of users, sorted by login field. */
export const getAutoSuggestList = async (limit: number): Promise<User[]|null> => {
  const sortedUsers = Object.values(users).sort(
    (user1: User, user2: User) => user1.login.toLowerCase() > user2.login.toLowerCase() ? 1 : -1);

  if (!sortedUsers) {
    return null;
  }
  
  return sortedUsers.slice(0, limit);
}