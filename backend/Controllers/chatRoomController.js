//chatRoomController.js

//Import model
import db from "../Models/_db.js";
import { Op } from 'sequelize';
const { ChatRoom } = db;

const createChatRoom = async (req, res) => {

    const { roomId, name, users, description } = req.body;

    try {

        //Create the chatroom object
        const newChatRoom = await ChatRoom.create({
            roomId,
            name,
            users,
            description,
        });

    } catch (error) {
        console.error("Error creating chatroom:", error);

        return res.status(400).json(
            {
                error: "Error creating chatroom.", details: error.message,

            }
        );
    }
};

const getChatRoomByUserId = async (req, res) => {
    const { userId } = req.params;
    console.log(userId)
    try {
        const rooms = await ChatRoom.findAll({
            where: {
                users: { [Op.contains]: [userId] }
            }
        });
        console.log("getChatRoomByUserId: ", rooms)
        if (!rooms) {
            return res.status(404).json({ error: "Chat Room Not Found" })
        }
        return res.status(200).json(rooms);

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
};


export { createChatRoom, getChatRoomByUserId };