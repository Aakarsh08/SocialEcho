import { io } from 'socket.io-client';
import {baseURL} from './config';

// Create socket instance but don't connect immediately
const socket = io(baseUrl, {
  withCredentials: true,
  autoConnect: false, // ✅ Don't auto-connect
});

export default socket;