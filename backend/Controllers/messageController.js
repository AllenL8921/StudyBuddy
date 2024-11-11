import { where } from 'sequelize';
import db from '../Models/_db.js'

const { Message } = db

const sendMessage = async (req, res) => {
    const { roomId, senderId, text } = req.body
    
    try {
        // Create a new message and save it to the database
        const newMessage = await Message.create({
            roomId: roomId,  
            senderId: senderId,  
            text: text,  
        });

        console.log('Message sent:', newMessage);
        res.status(200).json(newMessage);  
    } catch (error) {
        res.status(400).json('Error sending message:', error);
    }
}

const getMessages = async (req, res) => {
    const { roomId } = req.params
    
    try {
        const messages = await Message.findAll({
            where: { roomId: roomId }, order: [['createdAt', 'ASC']],
        })
        console.log(`Room: ${roomId}: ${messages}`)
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json(error)
    }
}

export {sendMessage, getMessages}