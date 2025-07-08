import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  Heart, MessageCircle, Share2, Bookmark, ThumbsUp, Eye, Send, Users,
  Bell, Hash, AtSign, Camera, Mic, Video, Image, Star, Zap, Smile, Globe
} from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:7000/api/register', {
        username,
        email,
        password,
      });
      alert(res.data.msg || 'Signup successful');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
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
            <Icon className="animate-pulse" />
          </div>
        ))}
      </div>

      {/* Additional Floating Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, index) => {
          const RandomIcon = socialIcons[Math.floor(Math.random() * socialIcons.length)];
          return (
            <div
              key={`float-${index}`}
              className="absolute text-gray-700 opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${12 + Math.random() * 8}s`,
              }}
            >
              <RandomIcon className="animate-bounce" />
            </div>
          );
        })}
      </div>

      {/* Signup Form */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-white mb-10 tracking-wide text-center">
            Hop on to{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent italic font-playfair">
              Social Echo
            </span>
          </h1></div>

        <form
          onSubmit={handleSignup}
          className="w-full max-w-md p-8 backdrop-blur-xl bg-gray-900/50 border border-gray-700 rounded-3xl shadow-2xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-300">Join the Social Echo community</p>
          </div>

          <div className="space-y-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
            />

            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">Sign Up</span>
            </button>

            <div className="text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-pink-400 hover:text-pink-300 font-semibold transition-colors duration-300 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Animations & Fonts */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-30px) translateX(20px) rotate(120deg);
          }
          66% {
            transform: translateY(20px) translateX(-15px) rotate(240deg);
          }
        }

        @keyframes drift {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(-40px) translateX(30px) scale(1.1);
          }
        }

        .absolute.text-gray-600 {
          animation: float linear infinite;
        }

        .absolute.text-gray-700 {
          animation: drift ease-in-out infinite;
        }

        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600&display=swap');

        .font-cursive {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>
    </div>
  );
}
