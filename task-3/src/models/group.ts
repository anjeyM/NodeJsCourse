import type {BuildOptions} from 'sequelize';
import {Model, DataTypes} from 'sequelize';

import {sequelize} from './db';
  
type GroupStatic = typeof Model
    & {associate: (models: any) => void}
    & {new(values?: Record<string, unknown>, options?: BuildOptions): any}

export const Group = <GroupStatic>sequelize.define('groups', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
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
  timestamps: false,
});
