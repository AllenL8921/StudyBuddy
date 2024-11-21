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
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
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
    // NOTE:: This assocation might be redundant seeing that the messages table holds every data that is needed
    // Each message already knows which chatroom and sender it belongs to

    // Message.associate = (models) => {
    //     Message.belongsToMany(models.ChatRoom, {
    //         through: 'ChatRoomsMessage',  // The join table for the many-to-many relationship
    //         as: 'message',                 // Alias for this association
    //         foreignKey: 'chatRoomId',  // The foreign key for the ChatRooms table
    //         otherKey: 'clerkUserId',    // The foreign key for the User table
    //     });
    // };

    return Message;
};
