//chatRoomController.js

//Study Sessions are chatrooms
//

//Import model
import db from "../Models/_db.js";
import { Op } from 'sequelize';
const { ChatRoom, User } = db;

const createChatRoom = async (req, res) => {

    try {

        const { name, organizerId, description } = req.body;

        //Validate form data


        //Create the chatroom object
        const newChatRoom = await ChatRoom.create({
            roomId,
            name,
            description,
        });

        //Handle associations


        return res.status(200).json({ message: "Study Room Created", chatRoom: newChatRoom });

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
        //Look for all chatrooms that the user is in

        const chatRooms = await ChatRoom.findAll({
            include: {
                model: User,
                as: 'Participants',
                where: { clerkUserId: userId },
                required: true,
            }
        });

        console.log("getChatRoomByUserId: ", chatRooms)
        if (!rooms) {
            return res.status(404).json({ error: "Chat Room Not Found" })
        }

        return res.status(200).json(chatRooms);

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
};


export { createChatRoom, getChatRoomByUserId };