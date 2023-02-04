import {User} from './users';
import {Group} from './group';
import {UserGroup} from './userGroup';

User.belongsToMany(Group, {
    through: UserGroup,
    foreignKey: 'user_id',
});

Group.belongsToMany(User, {
    through: UserGroup,
    foreignKey: 'group_id',
});

module.exports = {
    User,
    Group,
}
