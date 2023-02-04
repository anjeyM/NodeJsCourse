import type {InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey} from 'sequelize';
import {Model, DataTypes} from 'sequelize';
import {Permissions} from '../shared/types/interfaces';
import {User} from './users';
import {sequelize} from './db';
  
export class Group extends Model<InferAttributes<Group>, InferCreationAttributes<Group>> {
    declare id: CreationOptional<bigint>;
    declare ownerId: ForeignKey<User['id']>;
    declare name: string;
    declare permissions: Array<Permissions>;
}

Group.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      permissions: {
        type: new DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      tableName: 'groups',
      sequelize,
      timestamps: false,
    },
);
