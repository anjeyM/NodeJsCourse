import {Model} from 'sequelize';
import {sequelize} from '../../models/db';
import {UserGroup} from '../../models';
import {logger} from '../../shared/loggers/error-logger';

export const addUsersToGroup = async (groupId: number, userId: number): Promise<Model<any, any>|undefined> => {
    const t = await sequelize.transaction();
    try {
        const joinedTable = {userId, groupId};
        const savedUserGroup = await UserGroup.create(joinedTable, {transaction: t});
        await t.commit();
        return savedUserGroup;
    } catch (error) {
        logger.error(`Error: ${error} | The user to group transaction has been rolled back with args: %O`, {groupId, userId});
        await t.rollback();
        return;
    }
}