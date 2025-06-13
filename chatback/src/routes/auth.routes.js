import express from 'express';
import { signup } from '../controllers/signup.js';
import { login } from '../controllers/login.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/register', signup);
router.post('/login', login);

export default router;
