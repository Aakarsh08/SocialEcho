import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ limit: '16kb', extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// ✅ Auth routes
app.use('/api', authRoutes);

// ✅ Home test
app.get('/', (req, res) => {
  res.send('Welcome to Chatback');
});

// ✅ Upload a post (with optional image)
app.use('/posts', postRoutes);
export { app };
