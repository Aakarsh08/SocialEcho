// routes/post.js
import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.js';
import {
  createPost,
  getDashboardPosts
} from '../controllers/post.controller.js';

import {
  getFollowStatus,
  followUser
} from '../controllers/follow.controller.js';

import User from '../models/User.js';

const router = express.Router();

// ⬇️ Post-related
router.post('/upload', verifyToken, upload.single('image'), createPost);
router.get('/dashboard', verifyToken, getDashboardPosts);

// ⬇️ User-related
router.get('/users', verifyToken, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }, 'username _id');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch users' });
  }
});

// ✅ Follow-related routes
router.get('/follow-status', verifyToken, getFollowStatus);
router.post('/follow/:id', verifyToken, followUser);

export default router;
