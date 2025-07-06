import express from 'express';
import { getAllUsersExceptSelf } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js'; // ✅ use your real file

const router = express.Router();

// ✅ Route to get all users except self
router.get('/all/:userId', getAllUsersExceptSelf);

// ✅ Route to get logged-in user's ID
router.get('/me', verifyToken, (req, res) => {
  res.status(200).json({ user: req.user.id });
});

export default router;
