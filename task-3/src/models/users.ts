import type {InferAttributes, InferCreationAttributes, CreationOptional, 
  BelongsToManyGetAssociationsMixin, BelongsToManySetAssociationsMixin, BelongsToManyAddAssociationsMixin, BelongsToManyAddAssociationMixin,
  BelongsToManyCreateAssociationMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin, BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin, BelongsToManyCountAssociationsMixin} from 'sequelize';
import {Model, DataTypes} from 'sequelize';
import {Group} from './group';
import {sequelize} from './db';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<bigint>;
  declare login: string;
  declare password: string;
  declare age: string | null;
  declare isdeleted: boolean;

  declare getGroups: BelongsToManyGetAssociationsMixin<Group>;
  declare setGroups: BelongsToManySetAssociationsMixin<Group, Group['id']>;
  declare addGroups: BelongsToManyAddAssociationsMixin<Group, Group['id']>;
  declare addGroup: BelongsToManyAddAssociationMixin<Group, Group['id']>;
  declare createGroup: BelongsToManyCreateAssociationMixin<Group>;
  declare removeGroup: BelongsToManyRemoveAssociationMixin<Group, Group['id']>;
  declare removeGroups: BelongsToManyRemoveAssociationsMixin<Group, Group['id']>;
  declare hasGroup: BelongsToManyHasAssociationMixin<Group, Group['id']>;
  declare hasGroups: BelongsToManyHasAssociationsMixin<Group, Group['id']>;
  declare countGroups: BelongsToManyCountAssociationsMixin;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    age: {
        type: new DataTypes.STRING(128),
        allowNull: true,
    },
    isdeleted: {
        type: new DataTypes.BOOLEAN,
        allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: false,
  },
);
