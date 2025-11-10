import express from 'express';
import { chatController } from '../controllers/chat.js';

const router = express.Router();

router.post('/chat/:model', chatController);

export default router;