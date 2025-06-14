import { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import CommentModal from './CommentModal'; // ✅ Import your modal

export default function PostCard({ post }) {
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false); // ✅ modal state

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `http://localhost:7000/posts/like/${post._id}`,
        {},
        { withCredentials: true }
      );
      setLikesCount(res.data.likesCount);
      setLiked(res.data.liked);
    } catch (err) {
      console.error('❌ Error liking post:', err);
    }
  };

  const toggleCommentModal = () => setCommentOpen(prev => !prev); // ✅ toggle handler

  return (
    <>
      <div className="rounded-xl shadow-md p-4 bg-white mb-4">
        <p className="font-semibold text-blue-700">{post.author?.username || 'Unknown'}</p>
        <p className="my-2">{post.content}</p>

        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="w-full h-[300px] object-cover rounded-lg my-2"
          />
        )}

        <div className="flex gap-6 mt-3">
          <Button
            onClick={handleLike}
            variant="text"
            color={liked ? 'red' : 'blue'}
            className="capitalize"
          >
            ❤️ {likesCount}
          </Button>

          <Button
            onClick={toggleCommentModal}
            variant="text"
            color="blue"
            className="capitalize"
          >
            💬 Comment
          </Button>
        </div>
      </div>

      {/* ✅ Comment Modal Rendered Here */}
      <CommentModal
        open={commentOpen}
        handleOpen={toggleCommentModal}
        postId={post._id}
      />
    </>
  );
}
