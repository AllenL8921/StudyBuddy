// chatRoomModel.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const ChatRoom = sequelize.define('ChatRoom', {
        roomId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        roomName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        persistenceKey: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    }, {
        timestamps: true,
    });

    // Define associations
    //

    ChatRoom.associate = (models) => {
        ChatRoom.belongsToMany(models.User, {
            through: 'UserChatRooms',  // The join table for the many-to-many relationship
            as: 'Participants',                 // alias for this association
            foreignKey: 'roomId',  // The foreign key for the ChatRooms table
            otherKey: 'clerkUserId',    // The foreign key for the User table
        });

        ChatRoom.belongsToMany(models.Attribute, {
            through: "ChatRoomAttributes",
            as: "Tags",
            foreignKey: "roomId",
            otherKey: "attributeId",
        });
    };

    return ChatRoom;
};
