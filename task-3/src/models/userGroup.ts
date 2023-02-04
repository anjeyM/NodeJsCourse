import type {InferAttributes, InferCreationAttributes, CreationOptional} from 'sequelize';
import {Model, DataTypes} from 'sequelize';
import {sequelize} from './db';
  
/** A joining table for User and Group */
export class UserGroup extends Model<InferAttributes<UserGroup>, InferCreationAttributes<UserGroup>> {
    declare id: CreationOptional<bigint>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

UserGroup.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'userGroups',
        sequelize,
    },
);
  
  