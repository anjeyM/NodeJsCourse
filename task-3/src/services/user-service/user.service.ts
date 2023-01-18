import {User} from '../../models/users';

//** Gets limit number of users, sorted by login field. */
export const getAutoSuggestList = (limit: number, users: User[]): User[]|null => {
  const sortedUsers = Object.values(users).sort(
    (user1: User, user2: User) => user1.login.toLowerCase() > user2.login.toLowerCase() ? 1 : -1);

  if (!sortedUsers) {
    return null;
  }
  
  return sortedUsers.slice(0, limit);
}