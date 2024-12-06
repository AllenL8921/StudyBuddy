import express from "express";

//Import functionality
import { createStudySession, getAllStudySessions, getAttendees } from '../Controllers/studySessionController.js';

const router = express.Router();

// Define routes

//POST
router.post('/', createStudySession);


//GET
router.get('/', getAllStudySessions);
router.get('/getAttendees/:roomId', getAttendees);

export default router;