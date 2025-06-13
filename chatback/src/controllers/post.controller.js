import Post from '../models/Posts.js';
import cloudinary from '../utils/cloudinary.js';

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
