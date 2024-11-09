// attribute.model.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Attribute = sequelize.define('Attribute', {
        attributeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 50],
                    msg: 'Attribute must be between 3 and 50 characters long.',
                },
            },
        },
    },
        {
            timestamps: true,
        });

    // Define associations
    Attribute.associate = (models) => {
        // Many-to-many relationship with Event via the join table 'EventAttributes'
        Attribute.belongsToMany(models.Event, {
            through: "EventAttributes",
            as: "Events", // Alias for the related events (i.e) any events that has the attribute
            foreignKey: "attributeId",  // Foreign key for Attribute
            otherKey: "eventId",  // Foreign key for Event
        });
    };

    return Attribute;
};
