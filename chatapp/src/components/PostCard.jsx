import { Button } from "@material-tailwind/react";

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6">
      {/* Author */}
      <p className="text-sm text-gray-500 mb-2 font-semibold">
        {post.author?.username || 'Unknown'}
      </p>

      {/* Content */}
      <p className="text-gray-800 mb-4 text-base">{post.content}</p>

      {/* Image (if present) */}
      {post.image && (
        <div className="rounded-lg overflow-hidden mb-4">
          <img
            src={post.image}
            alt="Post"
            className="w-full object-cover aspect-[4/3]"
          />
        </div>
      )}

      {/* Like & Comment Buttons */}
      <div className="flex gap-4">
        <Button size="sm" variant="outlined" color="blue">
          ❤️ Like
        </Button>
        <Button size="sm" variant="outlined" color="blue">
          💬 Comment
        </Button>
      </div>
    </div>
  );
}
