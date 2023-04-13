import {Sequelize} from 'sequelize';
import {User, Group, UserGroup} from '../models/';
import dotenv from "dotenv";
import {logger} from '../shared/loggers/error-logger';

dotenv.config();

const {DB_PORT, DB_HOST, DB_NAME_DEV, DB_NAME_TEST, DB_USERNAME, DB_PASSWORD, NODE_ENV} = process.env;

export const sequelize = new Sequelize({
    host: DB_HOST,
    dialect: 'postgres',
    username: DB_USERNAME,
    password: DB_PASSWORD,
    // database: NODE_ENV === 'test' ? DB_NAME_TEST : DB_NAME_DEV,
    database: DB_NAME_DEV,
    port: Number(DB_PORT),
});
export class DB {
    public static sequelize: Sequelize;

    public static async initDB() {
        try {
            await User.sync(),
            await Group.sync(),
            await UserGroup.sync(),
            await sequelize.authenticate();
            logger.info({level: 'error', info: 'DB connection success'});
        } catch (error: any) {
            error.message = `DB connection error: ${error.message}`;
            throw error;
        }
    }
}