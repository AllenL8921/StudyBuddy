//This file describes all the routes for creating/modifying users
import express from 'express';

//Import functionality
import { getExistingUsers, getUserInfoById, getUserFriend, getChatRoomByUserId, setDisplayName, addFriend, getFriends, joinEvent, joinRoom, getUserInfoByName } from '../Controllers/userController.js';

const router = express.Router();

// POST routes
router.post('/relationships', addFriend);
router.post('/:id/displayName', setDisplayName);
router.post('/addFriend', addFriend);
router.post('/joinEvent', joinEvent);
router.post('/joinRoom', joinRoom);

// GET routes
router.get('/', getExistingUsers);
router.get('/:username', getUserInfoByName);
router.get('/userId/:userId', getUserInfoById); // This route gets the current user's information

router.get('/relationships/:userId', getFriends);
router.get('/relationships/:friendId', getUserFriend); // This route could potentially return chat data between users
router.get('/chatRooms/:userId', getChatRoomByUserId);

export default router; 