// controllers/follow.controller.js
import User from '../models/User.js';

export const getFollowStatus = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id).select('following');
    const users = await User.find({ _id: { $ne: req.user.id } }).select('username');

    const usersWithStatus = users.map(user => ({
      _id: user._id,
      username: user.username,
      isFollowing: currentUser.following.includes(user._id),
    }));

    res.json(usersWithStatus);
  } catch (err) {
    console.error('❌ Error in follow-status controller:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const followUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const targetUserId = req.params.id;

    if (!currentUser.following.includes(targetUserId)) {
      currentUser.following.push(targetUserId);
      await currentUser.save();
    }

    res.json({ msg: 'Followed successfully' });
  } catch (err) {
    console.error('❌ Error in follow controller:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
