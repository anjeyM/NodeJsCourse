import {User} from './users';
import {Group} from './group';
import {UserGroup} from './userGroup';

// User.belongsToMany(Group, {
//     through: UserGroup,
//     foreignKey: 'user_id',
//     as: 'group'
// });
User.associate = function (models) {
    User.belongsToMany(models.Group, {
      through: 'userGroup',
      as: 'groups',
      foreignKey: 'userId',
    });
};
User.sync();

// Group.belongsToMany(User, {
//     through: UserGroup,
//     foreignKey: 'group_id',
// });
Group.associate = function (models) {
    Group.belongsToMany(models.User, {
      through: 'userGroup',
      as: 'users',
      foreignKey: 'groupId',
    });
};
Group.sync();

export {User, Group, UserGroup}
