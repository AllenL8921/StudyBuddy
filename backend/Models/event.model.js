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
            type: DataTypes.INTEGER,
            allowNull: true, // An event can begin without an initial chatroom
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
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
            otherKey: "userId"
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
