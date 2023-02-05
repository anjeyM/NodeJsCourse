import {UserInterface} from '../../shared/types/interfaces';

//** Gets limit number of users, sorted by login field. */
export const getAutoSuggestList = (limit: number, users: UserInterface[]): UserInterface[]|null => {
  const sortedUsers = Object.values(users).sort(
    (user1: UserInterface, user2: UserInterface) => user1.login.toLowerCase() > user2.login.toLowerCase() ? 1 : -1);

  if (!sortedUsers) {
    return null;
  }
  
  return sortedUsers.slice(0, limit);
}