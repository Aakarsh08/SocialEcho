import Message from '../models/Message.js';

export const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  try {
    const newMessage = await Message.create({ chatId, sender: senderId, text });
    res.status(201).json(newMessage);
  } catch (err) {
    console.error('Message error:', err);
    res.status(500).json({ msg: 'Failed to send message' });
  }
};
