// controllers/like.controller.js
import Post from '../models/Posts.js';

export const toggleLikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      msg: alreadyLiked ? 'Disliked' : 'Liked',
      likesCount: post.likes.length,
      liked: !alreadyLiked,
    });
  } catch (err) {
    console.error('❌ Like controller error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
