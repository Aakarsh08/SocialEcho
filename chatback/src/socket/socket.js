import { verifySocketToken } from '../utils/verifySocketToken.js';
import Chat from '../models/Chat.js';
import Message from '../models/Message.js';

export const setupSocket = (io) => {
  io.on('connection', async (socket) => {
    const cookieHeader = socket.handshake.headers.cookie;
    const userId = verifySocketToken(cookieHeader);

    if (!userId) {
      console.log('❌ Unauthorized socket');
      return socket.disconnect();
    }

    console.log('✅ Socket connected as user:', userId);
    socket.join(userId); // User joins their own room

    socket.on('send-message', async ({ to, text }) => {
      console.log(`📨 Server received message from ${userId} to ${to}: ${text}`);
      
      try {
        let chat = await Chat.findOne({ members: { $all: [userId, to] } });
        if (!chat) {
          chat = await Chat.create({ members: [userId, to] });
        }
        
        const message = await Message.create({
          chatId: chat._id,
          sender: userId,
          text,
        });

        // ✅ FIXED: Create message object with proper structure
        const messageData = {
          from: userId,
          to: to,
          text: text,
          timestamp: message.createdAt || Date.now(),
          _id: message._id
        };

        // ✅ FIXED: Emit to BOTH sender and recipient
        io.to(to).emit('receive-message', messageData);
        io.to(userId).emit('receive-message', messageData);
        
        console.log(`📡 Emitting message to both ${to} and ${userId}`);
        
        // Optional: Send confirmation back to sender
        socket.emit('message-sent', { success: true, message: messageData });
        
      } catch (err) {
        console.error('💥 Socket message error:', err);
        socket.emit('message-error', { error: 'Failed to send message' });
      }
    });

    socket.on('disconnect', () => {
      console.log(`👋 Disconnected: ${userId}`);
    });
  });
};