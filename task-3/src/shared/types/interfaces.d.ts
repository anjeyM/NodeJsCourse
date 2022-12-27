export interface BaseUser {
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}
export interface User extends BaseUser {
    id: string;
}
export interface Users {
    [id: string]: User;
}