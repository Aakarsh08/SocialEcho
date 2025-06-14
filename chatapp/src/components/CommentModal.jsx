import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Button,
} from '@material-tailwind/react';

export default function CommentModal({ open, handleOpen, postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  // 📦 Fetch all comments for this post
  useEffect(() => {
    if (open) {
      axios
        .get(`http://localhost:7000/posts/comments/${postId}`, {
          withCredentials: true,
        })
        .then((res) => setComments(res.data))
        .catch((err) =>
          console.error('❌ Error fetching comments:', err)
        );
    }
  }, [open, postId]);

  // ➕ Add new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:7000/posts/comments/${postId}`,
        { content: newComment },
        { withCredentials: true }
      );

      setComments((prev) => [res.data.comment, ...prev]);
      setNewComment('');
    } catch (err) {
      console.error('❌ Failed to add comment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Comments</DialogHeader>

      <DialogBody className="space-y-4 max-h-[400px] overflow-y-auto">
        <Textarea
          label="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
        />
        <Button
          onClick={handleAddComment}
          variant="gradient"
          color="blue"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </Button>

        <div className="mt-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 italic">No comments yet.</p>
          ) : (
            comments.map((c, idx) => (
              <div key={idx} className="p-2 border-b">
                <p className="font-semibold">{c.username || 'Anonymous'}</p>
                <p className="text-sm text-gray-700">{c.content}</p>
                <p className="text-xs text-gray-400">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </DialogBody>

      <DialogFooter>
        <Button variant="text" color="red" onClick={handleOpen}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
