import {Model, DataTypes, BuildOptions} from 'sequelize';
import {sequelize} from './db';

type UserStatic = typeof Model
    & {associate: (models: any) => void}
    & {new(values?: Record<string, unknown>, options?: BuildOptions): any}

export const User = <UserStatic>sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
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
}, {
  timestamps: false,
});


