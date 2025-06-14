import Comment from '../models/Comment.js';
import Post from '../models/Posts.js';

export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    if (!content || !postId) {
      return res.status(400).json({ msg: 'Missing comment content or post ID' });
    }

    // Create the comment
    const newComment = await Comment.create({
      content,
      author: req.user.id,
      post: postId,
    });

    // Add comment to the post
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    // Populate the author's username
    const populatedComment = await newComment.populate('author', 'username');

    // Format and send response in same structure as getComments
    res.status(201).json({
      msg: 'Comment added',
      comment: {
        content: populatedComment.content,
        username: populatedComment.author.username,
        createdAt: populatedComment.createdAt,
      }
    });
  } catch (err) {
    console.error('❌ Error in addComment controller:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ msg: 'Post ID is required' });
    }

    // Populate the author's username
    const comments = await Comment.find({ post: postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    // Format each comment
    const formattedComments = comments.map(comment => ({
      content: comment.content,
      username: comment.author.username,
      createdAt: comment.createdAt,
    }));

    res.status(200).json(formattedComments);
  } catch (err) {
    console.error('❌ Error in getComments controller:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
