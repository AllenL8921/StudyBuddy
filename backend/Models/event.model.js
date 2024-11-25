// event.model.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Event = sequelize.define('Event', {
        eventId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        organizerId: {
            type: DataTypes.STRING,
        },
        chatRoomId: {
            type: DataTypes.UUID,
            references: {
                model: 'ChatRooms',  // Foreign key referencing the ChatRoom table
                key: 'roomId',
            },
            allowNull: false,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        scheduledDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
        { timestamps: true });

    // Define associations
    Event.associate = (models) => {
        // Many-to-many relationship with Users (attendees)
        Event.belongsToMany(models.User, {
            through: "EventUsers",
            as: "Attendees",
            foreignKey: "eventId",
            otherKey: "clerkUserId"
        });

        // One-to-many relationship with Attributes (tags)
        Event.belongsToMany(models.Attribute, {
            through: "EventAttributes",
            as: "Tags",
            foreignKey: "eventId",
            otherKey: "attributeId",
        });

    };

    return Event;
};
