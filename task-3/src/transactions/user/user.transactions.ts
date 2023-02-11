import {Model} from 'sequelize';
import {sequelize} from '../../models/db';
import {UserGroup} from '../../models';

export const addUsersToGroup = async (groupId: number, userId: number): Promise<Model<any, any>|undefined> => {
    const t = await sequelize.transaction();
    try {
        const joinedTable = {userId, groupId};
        console.log('TRANSACTION joinedTable: ', joinedTable);
        const savedUserGroup = await UserGroup.create(joinedTable, {transaction: t});
        console.log('TRANSACTION savedUserGroup: ', savedUserGroup);
        await t.commit();
        return savedUserGroup;
    } catch (error) {
        console.log('The user to group transaction has been rolled back.', error);
        await t.rollback();
        return;
    }
}