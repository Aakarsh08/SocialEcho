import axios from 'axios';
import { useState } from 'react';
import { User } from 'lucide-react';
import { baseURL } from '../config';

export default function FollowCard({ user, onToggleFollow }) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  const handleToggleFollow = async () => {
    try {
      const url = isFollowing
        ? `${baseURL}/posts/unfollow/${user._id}`
        : `${baseURL}/posts/follow/${user._id}`;

      await axios.post(url, {}, { withCredentials: true });

      setIsFollowing(!isFollowing);
      onToggleFollow(); // Notify parent if needed
    } catch (err) {
      console.error('❌ Follow/unfollow failed:', err);
    }
  };

  return (
    <div className="group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/15 mb-4">
      {/* Subtle glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex items-center justify-between gap-4">
        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-medium">{user.username}</span>
        </div>

        {/* Follow Button */}
        <button
          onClick={handleToggleFollow}
          className={`px-4 py-1.5 rounded-full font-medium transition-all duration-300 text-sm hover:scale-105 ${
            isFollowing
              ? 'bg-gray-600 text-white hover:bg-gray-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
}
