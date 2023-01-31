import {Table, Model, Column, DataType} from "sequelize-typescript";
import {Group} from './group';

//** A Model for Users table. */
@Table({
    timestamps: false,
    tableName: "users",
    freezeTableName: true,
})
export class User extends Model {
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        references: {
            model: Group,
            key: 'id',
          }
    })
    id!: bigint;

    @Column({
        type: DataType.STRING,
    })
    login!: string;

    @Column({
        type: DataType.STRING,
    })
    password!: string;

    @Column({
        type: DataType.INTEGER,
    })
    age!: number;

    @Column({
        type: DataType.BOOLEAN,
    })
    isdeleted!: boolean;
}