import { DataTypes, TableHints } from 'sequelize';

export default sequelize => {

    const UserFriends = sequelize.define('UserFriends', {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        friendId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        chatRoomId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },

    }, {
        TableHints: 'UserFriends',
        timestamps: true,
    });

    return UserFriends;
};