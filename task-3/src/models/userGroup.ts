import {DataTypes} from 'sequelize';
import {sequelize} from './db';
  
export const UserGroup = sequelize.define('ProductOrder', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
}, {});
  