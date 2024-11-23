//chatRoomController.js

//Import model
import db from "../Models/_db.js";
const { ChatRoom, User } = db;

const getAllChatRoom = async (req, res) => {
    try {
        const chatRooms = await ChatRoom.findAll({
            where: {
                isPublic: true,
            }
        });

        return res.status(200).json(chatRooms);

    } catch (error) {
        console.log("Error getting all chatrooms: ", error);

        return res.status(400).json({
            error: "Error getting chatrooms.",
            details: error.message,
        });
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
        if (!chatRooms) {
            return res.status(404).json({ error: "Chat Room Not Found" })
        }

        return res.status(200).json(chatRooms);

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
};


export { getAllChatRoom, getChatRoomByUserId };