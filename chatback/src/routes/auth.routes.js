import express from 'express';
import { signup } from '../controllers/signup.js';
import { login } from '../controllers/login.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.get('/profile', verifyToken, (req, res) => {
  console.log('📥 Cookies received on /api/profile:', req.cookies);
  console.log('🧑 Authenticated user:', req.user);
  res.json({ msg: `Welcome, user ${req.user.id}` });
});


export default router;
