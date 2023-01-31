import * as Joi from 'joi';
import {ContainerTypes, ValidatedRequestSchema} from 'express-joi-validation';

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

export interface RequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: BaseUser,
}

//** Query validation schema. */
export const validationSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*?)(?=.*?[a-zA-Z])[a-zA-Z]+$')).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required(),
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
export interface Group {
    id: bigint;
    name: string;
    permissions: Array<Permissions>;
}