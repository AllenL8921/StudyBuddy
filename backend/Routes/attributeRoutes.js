import express from 'express';

//Import functionality
import { getAllAttributes } from '../Controllers/attributeController.js';

const router = express.Router();

//Define Routes
router.get('/', getAllAttributes);

export default router;