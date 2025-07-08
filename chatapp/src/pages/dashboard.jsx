import { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Home, Search, Compass, Heart, MessageCircle, User, Settings, Menu } from 'lucide-react';
import CreatePostDialog from '../components/CreatePostForm';
import PostCard from '../components/PostCard';
import FollowCard from '../components/FollowCard';
import socket from '../socket';
import { useNavigate, useLocation } from 'react-router-dom';


export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:7000/api/logout', {}, { withCredentials: true });
      navigate('/'); // or navigate('/login')
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  useEffect(() => {
    if (!socket.connected) socket.connect();
    socket.on('connect', () => console.log('✅ Socket connected:', socket.id));
    socket.on('disconnect', () => console.log('❌ Socket disconnected'));
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  useEffect(() => {
    axios.get('http://localhost:7000/posts/dashboard', { withCredentials: true })
      .then(res => setPosts(res.data))
      .catch(err => console.error('❌ Failed to fetch posts:', err));

    axios.get('http://localhost:7000/posts/follow-status', { withCredentials: true })
      .then(res => setUsers(res.data))
      .catch(err => console.error('❌ Failed to fetch users:', err));
  }, []);

  const handleToggleFollowStatus = (userId) => {
    setUsers(prev =>
      prev.map(user =>
        user._id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/dashboard' },
    { id: 'search', icon: Search, label: 'Search', path: '/search' },
    { id: 'explore', icon: Compass, label: 'Explore', path: '/explore' },
    { id: 'messages', icon: MessageCircle, label: 'Messages', path: '/chat' },
    { id: 'notifications', icon: Heart, label: 'Notifications', path: '/notifications' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-row scrollbar-hide">
      {/* Sidebar */}
      <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-playfair">
            Social Echo
          </h1>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10 ${isActive(item.path) ? 'bg-white/10 text-white' : 'text-white/70'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}

          </div>

          <div className="mt-6">
            <button
              onClick={() => setShowPostForm(prev => !prev)}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform"
            >
              <Plus className="w-5 h-5" />
              Create
            </button>
          </div>

          {showPostForm && (
            <div className="mt-4">
              <CreatePostDialog setPosts={setPosts} />
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/10 text-white/70">
            <Menu className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 mt-2 rounded-lg hover:bg-red-500/20 text-red-400"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Feed */}
      <div className="flex-1 overflow-y-auto max-h-screen p-6 space-y-6 scrollbar-hide">
        {posts.length > 0 ? (
          posts.map(post => <PostCard key={post._id} post={post} />)
        ) : (
          <div className="text-center text-gray-500 italic">No posts yet.</div>
        )}
      </div>

      {/* Suggested Users */}
      <div className="w-80 border-l border-white/10 bg-white/5 backdrop-blur-xl overflow-y-auto max-h-screen p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Suggested Users</h3>
          <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
            See All
          </button>
        </div>
        {users.length === 0 ? (
          <p className="text-sm italic text-gray-400">No users to follow</p>
        ) : (
          <div className="space-y-3">
            {users.map(user => (
              <FollowCard
                key={user._id}
                user={user}
                onToggleFollow={() => handleToggleFollowStatus(user._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}