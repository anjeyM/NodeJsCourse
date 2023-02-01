import {Table, Model, Column, DataType} from "sequelize-typescript";
import {Permissions} from '../shared/types/interfaces';

//** A Model for Group table. */
@Table({
    timestamps: false,
    tableName: "groups",
    freezeTableName: true,
})
export class Group extends Model {
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
    })
    id!: bigint;

    @Column({
        type: DataType.STRING,
    })
    name!: string;

    @Column({
        type: DataType.ARRAY(DataType.STRING),
    })
    permissions!: Array<Permissions>;
}