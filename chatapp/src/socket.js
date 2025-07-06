import { io } from 'socket.io-client';

// Create socket instance but don't connect immediately
const socket = io('http://localhost:7000', {
  withCredentials: true,
  autoConnect: false, // ✅ Don't auto-connect
});

export default socket;