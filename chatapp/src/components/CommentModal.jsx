import React, { useEffect, useState } from 'react';
import { X, Send, User, MessageCircle } from 'lucide-react';
import axios from 'axios';
import baseURL from '../config'

export default function CommentModal({ open, handleOpen, postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  // 📦 Fetch all comments for this post
  useEffect(() => {
    if (open) {
      axios
        .get(`${baseURL}/posts/comments/${postId}`, {
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
        `${baseURL}/posts/comments/${postId}`,
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return `Just now`;
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-gray-700 rounded-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Comments</h2>
          <button
            onClick={handleOpen}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Comments */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 scrollbar-hide">
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">No comments yet</p>
              <p className="text-gray-600 text-xs mt-1">Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="flex gap-3">
                {/* Avatar */}
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>

                {/* Comment Body */}
                <div className="flex-1 min-w-0">
                  <div className="bg-gray-900 rounded-2xl px-4 py-2">
                    <p className="font-semibold text-white text-sm mb-1">
                      {comment.username || 'Anonymous'}
                    </p>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-2">
                    {formatTimeAgo(comment.createdAt)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-700 p-4">
          <div className="flex gap-3 items-end">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>

            <div className="flex-1 relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a comment..."
                className="w-full bg-gray-900 border border-gray-600 rounded-2xl px-4 py-3 pr-12 text-white placeholder-gray-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent max-h-32 scrollbar-hide"
                rows={1}
                style={{
                  minHeight: '44px',
                  height: newComment ? 'auto' : '44px'
                }}
              />
              <button
                onClick={handleAddComment}
                disabled={loading || !newComment.trim()}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
                  newComment.trim() && !loading
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
