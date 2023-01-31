import {Sequelize} from 'sequelize-typescript';
import {User} from './users';
import {Group} from './group';
import dotenv from "dotenv"

dotenv.config();

const {DB_PORT, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD} = process.env;


export class DB {
    public static sequelize: Sequelize;

    public static async initDB() {
        DB.sequelize = new Sequelize({
            host: DB_HOST,
            dialect: 'postgres',
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_NAME,
            port: Number(DB_PORT),
        });

        DB.sequelize.addModels([
            User, Group,
        ]);

        try {
            await DB.sequelize.authenticate();
        } catch (error: any) {
            error.message = `DB connection error: ${error.message}`;
            throw error;
        }
    }
}