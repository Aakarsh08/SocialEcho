// components/Dashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePostForm from '../components/CreatePostForm';
import PostCard from '../components/PostCard';
import FollowCard from '../components/FollowCard';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch dashboard posts
    axios.get('http://localhost:7000/posts/dashboard', {
      withCredentials: true
    })
      .then(res => setPosts(res.data))
      .catch(err => console.error('❌ Failed to fetch posts:', err));

    // Fetch all users for sidebar
    axios.get('http://localhost:7000/posts/users', {
      withCredentials: true
    })
      .then(res => setUsers(res.data))
      .catch(err => console.error('❌ Failed to fetch users:', err));
  }, []);

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
      {/* Left Side: Create + Posts */}
      <div style={{ flex: 3 }}>
        <CreatePostForm setPosts={setPosts} />
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {/* Right Side: Followable Users */}
      <div style={{ flex: 1 }}>
        <h3>Suggested Users</h3>
        {users.map(user => (
          <FollowCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}
