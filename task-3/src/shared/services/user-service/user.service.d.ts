import { BaseUser, User } from '../../types/interfaces';
export declare const findAll: () => Promise<User[]>;
export declare const find: (id: string) => Promise<User>;
export declare const createUser: (user: BaseUser) => Promise<User>;
export declare const deleteUser: (userId: string) => Promise<User | null>;
export declare const updateUser: (id: string, user: BaseUser) => Promise<User | null>;
export declare const getAutoSuggestList: (limit: number) => Promise<User[] | null>;
