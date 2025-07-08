import { useState } from 'react';
import axios from 'axios';
import { Heart, MessageCircle, Share, User } from 'lucide-react';
import CommentModal from './CommentModal'; // ✅ Make sure path is correct
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { baseURL } from '../config';

export default function PostCard({ post }) {
  dayjs.extend(relativeTime);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `${baseURL}/posts/like/${post._id}`,
        {},
        { withCredentials: true }
      );
      setLikesCount(res.data.likesCount);
      setLiked(res.data.liked);
    } catch (err) {
      console.error('❌ Error liking post:', err);
    }
  };

  const toggleCommentModal = () => setCommentOpen((prev) => !prev);

  return (
    <>
      <div className="group relative mb-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/15">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">
              {post.author?.username || 'Unknown'}
            </h3>
            <p className="text-white/60 text-sm"> {dayjs(post.createdAt).fromNow()}</p>
          </div>
        </div>

        <div className="relative z-10">
          {post.image && (
            <div className="relative mb-4 overflow-hidden rounded-xl">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}
          <p className="text-white/90 leading-relaxed mb-4">
            {post.content}
          </p>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-white/10 relative z-10">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
              liked
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                liked ? 'fill-red-400 text-red-400' : ''
              }`}
            />
            <span className="font-medium">{likesCount}</span>
          </button>

          <button
            onClick={toggleCommentModal}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Comment</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 hover:scale-105 ml-auto">
            <Share className="w-5 h-5" />
          </button>
        </div>
      </div>

      <CommentModal
        open={commentOpen}
        handleOpen={toggleCommentModal}
        postId={post._id}
      />
    </>
  );
}
