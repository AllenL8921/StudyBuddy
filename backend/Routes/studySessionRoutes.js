import express from "express";

//Import functionality
import { createStudySession, getAllStudySessions } from '../Controllers/studySessionController.js';

const router = express.Router();

// Define routes

//POST
router.post('/', createStudySession);


//GET
router.get('/', getAllStudySessions);

export default router;