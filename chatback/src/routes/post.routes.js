import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import User from '../models/User.js';
import { createPost, getDashboardPosts } from '../controllers/post.controller.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/upload', verifyToken, upload.single('image'), createPost);
router.get('/dashboard', verifyToken, getDashboardPosts);

// ✅ New: Get all users except current
router.get('/users', verifyToken, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }, 'username _id');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch users' });
  }
});

export default router;
