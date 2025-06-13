import express from 'express';
import { createPost } from '../controllers/post.controller.js';
import upload from '../middlewares/upload.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, upload.single('image'), createPost);

export default router;
