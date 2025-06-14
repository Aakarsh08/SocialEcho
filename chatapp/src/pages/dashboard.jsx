import { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePostDialog from '../components/CreatePostForm'; // Assuming this is the correct path
import PostCard from '../components/PostCard';
import FollowCard from '../components/FollowCard';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/posts/dashboard', { withCredentials: true })
      .then(res => setPosts(res.data))
      .catch(err => console.error('❌ Failed to fetch posts:', err));

    axios.get('http://localhost:7000/posts/follow-status', { withCredentials: true })
      .then(res => setUsers(res.data))
      .catch(err => console.error('❌ Failed to fetch users:', err));
  }, []);

  const handleToggleFollowStatus = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user._id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  return (
    <div className="min-h-screen bg-blue-100 p-4 flex flex-col lg:flex-row gap-4">
      {/* Left Side */}
      <div className="flex-[3] flex flex-col gap-4">
        {/* Sticky Create Post */}
        <div className="sticky top-0 z-20 bg-blue-100">
          <CreatePostDialog setPosts={setPosts} />
        </div>

        {/* Scrollable Posts */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-100px)] bg-white border rounded-xl p-4">
          {posts.length > 0 ? (
            posts.map(post => <PostCard key={post._id} post={post} />)
          ) : (
            <div className="text-gray-500 italic">No posts to show yet.</div>
          )}
        </div>
      </div>

      {/* Right Side: Suggested Users */}
      <div className="flex-1 h-[calc(100vh-32px)] bg-white border rounded-xl p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-3">Suggested Users</h3>
        {users.length === 0 ? (
          <p className="text-sm italic text-gray-600">No users to follow</p>
        ) : (
          users.map(user => (
            <FollowCard
              key={user._id}
              user={user}
              onToggleFollow={() => handleToggleFollowStatus(user._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
