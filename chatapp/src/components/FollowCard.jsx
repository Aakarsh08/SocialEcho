import axios from 'axios';
import { useState } from 'react';

export default function FollowCard({ user, onToggleFollow }) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  const handleToggleFollow = async () => {
    try {
      const url = isFollowing
        ? `http://localhost:7000/posts/unfollow/${user._id}`
        : `http://localhost:7000/posts/follow/${user._id}`;

      await axios.post(url, {}, { withCredentials: true });

      // ✅ Update local state
      setIsFollowing(!isFollowing);

      // ✅ Notify Dashboard to update UI
      onToggleFollow(); 
    } catch (err) {
      console.error('❌ Follow/unfollow failed:', err);
    }
  };

  return (
    <div className="flex justify-between items-center border-b py-2">
      <span>{user.username}</span>
      <button
        onClick={handleToggleFollow}
        className={`px-3 py-1 rounded text-white ${
          isFollowing ? 'bg-gray-600' : 'bg-blue-500'
        }`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}
