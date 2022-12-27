"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAutoSuggestList = exports.updateUser = exports.deleteUser = exports.createUser = exports.find = exports.findAll = void 0;
const uuid_1 = require("uuid");
/**
 * In-Memory Store
 */
let users = {
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
};
//** Findes all users. */
const findAll = async () => Object.values(users);
exports.findAll = findAll;
//** Findes user by id. */
const find = async (id) => users[id];
exports.find = find;
//** Creates user. */
const createUser = async (user) => {
    const id = (0, uuid_1.v4)();
    users[id] = { id, ...user };
    return users[id];
};
exports.createUser = createUser;
//** Deletes user. */
const deleteUser = async (userId) => {
    const user = await (0, exports.find)(userId);
    if (!user) {
        return null;
    }
    user.isDeleted = true;
    return user;
};
exports.deleteUser = deleteUser;
//** Updates users. */
const updateUser = async (id, user) => {
    const userFromDataBase = await (0, exports.find)(id);
    if (!userFromDataBase) {
        return null;
    }
    users[id] = { id, ...user };
    return users[id];
};
exports.updateUser = updateUser;
//** Gets limit number of users, sorted by login field. */
const getAutoSuggestList = async (limit) => {
    const sortedUsers = Object.values(users).sort((user1, user2) => user1.login.toLowerCase() > user2.login.toLowerCase() ? 1 : -1);
    if (!sortedUsers) {
        return null;
    }
    return sortedUsers.slice(0, limit);
};
exports.getAutoSuggestList = getAutoSuggestList;
