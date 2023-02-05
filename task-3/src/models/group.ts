import type {BuildOptions} from 'sequelize';
import {Model, DataTypes} from 'sequelize';

import {sequelize} from './db';
  
type GroupStatic = typeof Model
    & {associate: (models: any) => void}
    & {new(values?: Record<string, unknown>, options?: BuildOptions): any}

export const Group = <GroupStatic>sequelize.define('Group', {
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
}, {
  tableName: 'groups',
  timestamps: false,
});
