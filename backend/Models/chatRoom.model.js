// chatRoomModel.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const ChatRoom = sequelize.define('ChatRoom', {
        roomId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: false,
    });

    // Define associations
    ChatRoom.associate = (models) => {
        ChatRoom.belongsToMany(models.User, {
            through: 'UserChatRooms',  // The join table for the many-to-many relationship
            as: 'Participants',                 // alias for this association
            foreignKey: 'chatRoomId',  // The foreign key for the ChatRooms table
            otherKey: 'clerkUserId',    // The foreign key for the User table
        });
    };

    return ChatRoom;
};
