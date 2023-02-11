import {DataTypes} from 'sequelize';
import {sequelize} from './db';
  
export const UserGroup = sequelize.define('usergroup', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
}, {
  timestamps: false,
});
  