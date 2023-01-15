import {Sequelize} from 'sequelize-typescript';
import {User} from '../models/users';

const {DB_PORT, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD} = process.env;

export const sequelizeConnection = new Sequelize({
  host: DB_HOST,
  dialect: 'postgres',
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT),
  models: [User],
});

sequelizeConnection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });