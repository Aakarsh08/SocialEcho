import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import uploadRoute from './routes/uploadRoute.js';
import postRoutes from './routes/post.routes.js';

const app = express();


import dotenv from 'dotenv';
dotenv.config();

app.use(cors({
  origin: 'http://localhost:5173',  // ✅ Hardcode for now
  credentials: true,
//   methods: ['GET', 'POST', 'OPTIONS'],  // ✅ Include OPTIONS
//   allowedHeaders: ['Content-Type']      // ✅ Allow headers you use
}));



app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({limit: "16kb", extended: true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use('/api', authRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to Chatback');
});
app.use('/upload', uploadRoute);
app.use('/posts', postRoutes); 


export { app };
