import express from 'express';

import { createChatRoom, getAllChatRoom, getChatRoomByUserId } from '../Controllers/chatRoomController.js';

const router = express.Router();

//POST
router.post('/', createChatRoom);

//GET
router.get('/', getAllChatRoom);
router.get('/:userId', getChatRoomByUserId);

export default router;