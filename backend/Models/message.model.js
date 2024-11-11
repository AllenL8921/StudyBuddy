import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Message = sequelize.define('Message', {
        roomId: {
            type: DataTypes.INTEGER,
            allowNull: false, // roomId should not be nullable
        },
        messageId: {
            type: DataTypes.INTEGER,
            primaryKey: true,  // It is the primary key of the table
            allowNull: false,  // messageId should not be null
            autoIncrement: true, // Ensure the field auto-increments
        },
        text: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        senderId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // automatically sets creation time
        },
    }, {
        timestamps: false, // Disable automatic `updatedAt` and `createdAt` columns if not needed
    });

    // Define associations
    Message.associate = (models) => {
        Message.belongsToMany(models.ChatRoom, {
            through: 'ChatRoomsMessage',  // The join table for the many-to-many relationship
            as: 'message',                 // Alias for this association
            foreignKey: 'chatRoomId',  // The foreign key for the ChatRooms table
            otherKey: 'clerkUserId',    // The foreign key for the User table
        });
    };

    return Message;
};
