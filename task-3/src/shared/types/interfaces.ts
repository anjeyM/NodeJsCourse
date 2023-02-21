import * as Joi from 'joi';
import {ContainerTypes, ValidatedRequestSchema} from 'express-joi-validation';

export interface BaseUser {
    login: string;
    password: string;
    age: number;
    isdeleted: boolean;
}

export interface UserInterface extends BaseUser {
    id: number;
}

export interface Users {
    [id: string]: UserInterface;
}

export interface RequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: BaseUser,
}

//** User query validation schema. */
export const userValidationSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*?)(?=.*?[a-zA-Z])[a-zA-Z]+$')).required(),
    age: Joi.number().min(4).max(130).required(),
    isdeleted: Joi.boolean().required(),
})

//** Group query validation schema. */
export const groupValidationSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().required(),
})

//** Login query validation schema. */
export const loginValidationSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*?)(?=.*?[a-zA-Z])[a-zA-Z]+$')).required(),
})

//** Permission types. */
export enum Permissions {
    READ = 'read',
    WRITE = 'write',
    DELETE = 'delete',
    SHARE = 'share',
    UPLOAD_FILES = 'upload_files',
}

//** Group instance interface. */
export interface GroupInterface {
    id: bigint;
    name: string;
    permissions: Array<Permissions>;
}

export interface UserGroupInterface {
    id: bigint;
    UserId: bigint;
    GroupId: bigint;
}