import express from 'express';
import { createOrGetChat, getMessages} from '../controllers/chat.controller.js';


const router = express.Router();

router.post('/', createOrGetChat);
router.get('/messages/:user1/:user2', getMessages); // POST /chats

export default router;
