import { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePostForm from '../components/CreatePostForm';
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

  // 🔁 Toggle follow status locally in Dashboard's user list
  const handleToggleFollowStatus = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user._id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  return (
    <div className="h-screen bg-blue-100 p-4 flex gap-8">
      <div className="w-[75vw] flex flex-col gap-4">
        <div className="bg-white border rounded-xl p-4">
          <CreatePostForm setPosts={setPosts} />
        </div>
        <div className="bg-white border rounded-xl p-4 h-full">
          {posts.length > 0 ? (
            posts.map(post => <PostCard key={post._id} post={post} />)
          ) : (
            <div className="text-gray-500 italic">No posts to show yet.</div>
          )}
        </div>
      </div>

      <div className="flex-1 bg-white border rounded-xl p-4">
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
