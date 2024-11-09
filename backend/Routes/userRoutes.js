//This file describes all the routes for creating/modifying users
import express from 'express';

//Import functionality
import { getExistingUsers, findUser, addFriend, getFriends, joinEvent } from '../Controllers/userController.js';

const router = express.Router();

// POST routes
router.post('/relationships', addFriend);

// GET routes
router.get('/', getExistingUsers);

router.get('/relationships', getFriends);
router.get('/relationships/:id', findUser); // This route could potentially return chat data between users

export default router; 