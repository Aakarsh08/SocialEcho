// routes/post.js
import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.js';
import {createPost,getDashboardPosts} from '../controllers/post.controller.js';
import {getFollowStatus,followUser,unfollowUser} from '../controllers/follow.controller.js';
import { toggleLikePost } from '../controllers/likes.controller.js';
import { addComment, getComments } from '../controllers/comments.controller.js';
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

router.get('/follow-status', verifyToken, getFollowStatus);
router.post('/follow/:id', verifyToken, followUser);
router.post('/unfollow/:id', verifyToken, unfollowUser);
router.post('/like/:id', verifyToken, toggleLikePost);
router.post('/comments/:postId', verifyToken, addComment);
router.get('/comments/:postId', verifyToken, getComments);


export default router;
