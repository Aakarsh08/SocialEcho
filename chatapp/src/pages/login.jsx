import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Heart, MessageCircle, Share2, Bookmark, ThumbsUp, Eye, Send, Users,
  Bell, Hash, AtSign, Camera, Mic, Video, Image, Star, Zap, Smile, Globe
} from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:7000/api/login', {
        email,
        password,
      }, {
        withCredentials: true,
      });
      alert('Login successful');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  const socialIcons = [
    Heart, MessageCircle, Share2, Bookmark, ThumbsUp, Eye, Send, Users,
    Bell, Hash, AtSign, Camera, Mic, Video, Image, Star, Zap, Smile, Globe
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {socialIcons.map((Icon, index) => (
          <div
            key={index}
            className="absolute text-gray-600 opacity-20 hover:opacity-40 transition-opacity duration-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 20}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            <Icon className="animate-pulse" size={20 + Math.random() * 20} />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-5xl font-bold text-white mb-10 tracking-wide text-center">
          Hop on to <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent italic font-playfair">Social Echo</span>
        </h1>

        <form
          onSubmit={handleLogin}
          className="w-full max-w-md p-8 backdrop-blur-xl bg-gray-900/50 border border-gray-700 rounded-3xl shadow-2xl space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-300">Sign in to your account</p>
          </div>

          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <span className="relative z-10">Sign In</span>
          </button>

          <div className="text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/"
                className="text-pink-400 hover:text-pink-300 font-semibold transition-colors duration-300 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(20px) rotate(120deg); }
          66% { transform: translateY(20px) translateX(-15px) rotate(240deg); }
        }

        @keyframes drift {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(-40px) translateX(30px) scale(1.1); }
        }

        .absolute.text-gray-600 {
          animation: float linear infinite;
        }

        .absolute.text-gray-700 {
          animation: drift ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
