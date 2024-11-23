import { DataTypes } from 'sequelize';

export default (sequelize) => {

    const StudySession = sequelize.define('StudySession', {
        studySessionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        chatRoomId: {
            type: DataTypes.UUID,
            references: {
                model: 'ChatRooms',  // Foreign key referencing the ChatRoom table
                key: 'roomId',
            },
            allowNull: false,
            unique: true,  // Ensure chatRoomId is unique across the Event table
        },
        organizerId: {
            type: DataTypes.STRING,
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        persistenceKey: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // UUID for global uniqueness
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    }, {
        timestamps: true,
    });

    StudySession.associate = (models) => {
        StudySession.belongsToMany(models.User, {
            through: 'UserStudySessions',  // The join table for the many-to-many relationship
            as: 'Participants',                 // alias for this association
            foreignKey: 'studySessionId',  // The foreign key for the UserStudySessions table
            otherKey: 'clerkUserId',    // The foreign key for the User table
            onDelete: 'CASCADE',
        });

        StudySession.belongsToMany(models.Attribute, {
            through: 'StudySessionAttributes',
            as: 'StudySessionTags',
            foreignKey: 'studySessionId',
            otherKey: 'attributeId',
            onDelete: 'CASCADE',
        });
    };

    return StudySession;
}
