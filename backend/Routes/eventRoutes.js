//backend/Routes/eventRoutes.js
//This file should define the router and routes necessary to implement eventController.js
import express from 'express';

//Import functionality
import { createEvent, getAllEvents, getEventByName } from '../Controllers/eventController.js';

const router = express.Router();

/*
    Testing createEvent route

{
"organizerId" : "user_2oa8E4kiVSXv5fGJU9fl4SxfVsB",
"chatRoomId"  : null,
"title": "TestEvent",
"description" : "This is a test event.",
"tags": []
}

*/

//POST
router.post('/', createEvent);

//GET
router.get('/', getAllEvents);
router.get('/search', getEventByName);

export default router;