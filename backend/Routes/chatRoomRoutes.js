import express from 'express';

import { createChatRoom, getChatRoomByUserId } from '../Controllers/chatRoomController.js';

const router = express.Router();

//POST
router.post('/', createChatRoom);

//GET
router.get('/:userId', getChatRoomByUserId);

export default router;