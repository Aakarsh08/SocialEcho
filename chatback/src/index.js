import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { app } from './app.js';
import connectDB from './db/index.js';
import http from 'http';
import { Server } from 'socket.io';
import { setupSocket } from './socket/socket.js'; // ✅ new import

const PORT = process.env.PORT || 7000;

// Create HTTP server from Express app
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

// Setup socket handlers
setupSocket(io); // ✅ move logic to socket/socket.js

// Connect DB and start server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
  });
