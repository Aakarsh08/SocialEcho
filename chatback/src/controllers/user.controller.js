import User from '../models/User.js';

export const getAllUsersExceptSelf = async (req, res) => {
  const { userId } = req.params;

  try {
    const users = await User.find({ _id: { $ne: userId } }).select('username _id');
    res.status(200).json(users);
  } catch (err) {
    console.error('User fetch error:', err);
    res.status(500).json({ msg: 'Failed to fetch users' });
  }
};
