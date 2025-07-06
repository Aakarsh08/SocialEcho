import Chat from '../models/Chat.js';
import Message from '../models/Message.js';


export const createOrGetChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    let chat = await Chat.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await Chat.create({ members: [senderId, receiverId] });
    }

    res.status(200).json(chat);
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};



export const getMessages = async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    let chat = await Chat.findOne({ members: { $all: [user1, user2] } });

    if (!chat) return res.json([]); // No chat yet

    const messages = await Message.find({ chatId: chat._id }).sort('createdAt');
    res.json(messages);
  } catch (err) {
    console.error('💥 Failed to load messages:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};