import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const User = sequelize.define('User', {
        clerkUserId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Clerk user ID must be unique.',
            },
            primaryKey: true,
            validate: {
                len: {
                    args: [1, 255],
                    msg: 'Clerk user ID must be between 1 and 255 characters long.',
                },
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Username must be unique.',
            },
            validate: {
                len: {
                    args: [3, 50],
                    msg: 'Username must be between 3 and 50 characters long.',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Email must be unique.',
            },
            validate: {
                isEmail: {
                    msg: 'Must be a valid email address.',
                },
            },
        }
    },
    );

    // Define associations

    User.associate = (models) => {
        User.belongsToMany(models.User, {
            through: 'UserFriends',
            as: 'Friends', // alias
            foreignKey: 'userId',
            otherKey: 'friendId',
            onDelete: 'CASCADE',
        });

        User.belongsToMany(models.Event, {
            through: 'EventUsers',
            as: 'Events',
            foreignKey: 'userId',
            otherKey: 'eventId',
            onDelete: 'CASCADE',
        });
    };


    return User;
};
