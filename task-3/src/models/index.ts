import {User} from './users';
import {Group} from './group';
import {UserGroup} from './userGroup';

User.belongsToMany(Group, {
    through: UserGroup,
});
User.sync();

Group.belongsToMany(User, {
    through: UserGroup,
});
Group.sync();

export {User, Group, UserGroup}
