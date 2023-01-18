import { Table, Model, Column, DataType } from "sequelize-typescript";

//** A Model for Users table. */
@Table({
    timestamps: false,
    tableName: "users",
    freezeTableName: true,
})
export class User extends Model {
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        primaryKey: true,
    })
    id!: bigint;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    login!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    age!: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    is_deleted!: boolean;
}