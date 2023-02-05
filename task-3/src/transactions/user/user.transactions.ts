import {Model} from 'sequelize';
import {sequelize} from '../../models/db';
import {UserGroup} from '../../models';

export const addUsersToGroup = async (groupId: bigint, userId: bigint): Promise<Model<any, any>|undefined> => {
    const t = await sequelize.transaction();
    try {
        const joinedTable = {userId, groupId};
        const savedUserGroup = await UserGroup.create(joinedTable);
        await t.commit();
        return savedUserGroup;
    } catch (error) {
        console.log('The user to group transaction has been rolled back.', error);
        await t.rollback();
        return;
    }
}