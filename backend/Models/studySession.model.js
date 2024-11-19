import { DataTypes } from "sequelize";

export default (sequelize) => {

    const StudyRoom = sequelize.define('StudyRoom', {
        roomName: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                len: {
                    args: [1, 25],
                },
            },
        },
        whiteBoardKey: {
            type: DataTypes.STRING,
            unique: true,
        },

    },
    )


    return StudyRoom;
};