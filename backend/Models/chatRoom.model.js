// chatRoomModel.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const ChatRoom = sequelize.define('ChatRoom', {
        roomId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // UUID for global uniqueness
            primaryKey: true,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });

    // Define associations

    ChatRoom.associate = (models) => {
        ChatRoom.belongsToMany(models.User, {
            through: 'UserChatRooms',  // The join table for the many-to-many relationship
            as: 'Participants',                 // alias for this association
            foreignKey: 'roomId',  // The foreign key for the ChatRooms table
            otherKey: 'clerkUserId',    // The foreign key for the User table
            onDelete: 'CASCADE',
        });

    };

    return ChatRoom;
};