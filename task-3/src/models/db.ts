import {Sequelize} from 'sequelize';
import {User, Group, UserGroup} from '../models/';
import dotenv from "dotenv";

dotenv.config();

const {DB_PORT, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD} = process.env;

export const sequelize = new Sequelize({
    host: DB_HOST,
    dialect: 'postgres',
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
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
            console.log('DB connection success');
        } catch (error: any) {
            error.message = `DB connection error: ${error.message}`;
            throw error;
        }
    }
}