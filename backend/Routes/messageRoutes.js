import express from 'express';

import { sendMessage, getMessages } from '../Controllers/messageController.js';

const router = express.Router();

//POST
router.post('/sendMessage', sendMessage);

//get
router.get('/getMessage/:roomId', getMessages);

export default router;