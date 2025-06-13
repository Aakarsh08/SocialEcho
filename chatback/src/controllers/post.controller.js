import Post from '../models/Posts.js';
import cloudinary from '../utils/cloudinary.js';
import User from '../models/User.js';

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const author = req.user.id;

    let imageUrl = '';

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const cloudRes = await cloudinary.uploader.upload(dataURI, {
        resource_type: 'auto',
      });
      imageUrl = cloudRes.secure_url;
    }

    const newPost = new Post({
      content,
      author,
      image: imageUrl,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Post creation failed:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const getDashboardPosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    if (!currentUser) return res.status(404).json({ message: 'User not found' });

    const posts = await Post.find({ author: { $in: currentUser.following } })
      .sort({ createdAt: -1 })
      .populate('author', 'username') // to get author's username

    res.status(200).json(posts);
  } catch (err) {
    console.error('Dashboard fetch failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
