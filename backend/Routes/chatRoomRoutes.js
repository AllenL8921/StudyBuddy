import express from 'express';

import { getAllChatRoom, getChatRoomByUserId } from '../Controllers/chatRoomController.js';

const router = express.Router();

//POST

//GET
router.get('/', getAllChatRoom);
router.get('/:userId', getChatRoomByUserId);

export default router;