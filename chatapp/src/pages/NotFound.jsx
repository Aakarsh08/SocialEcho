import React, { useState, useEffect } from 'react';
import { Home, ArrowLeft, Search, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ for redirect

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ⏳ Slowed down floating element animations
  const floatingElements = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${6 + Math.random() * 4}s`, // slower: 6–10s
      }}
    />
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">{floatingElements}</div>

      {/* Dynamic gradient orb that follows mouse */}
      <div
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number with glassmorphism effect */}
          <div className="relative mb-8">
            <div className="text-[12rem] md:text-[16rem] font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-white/5 leading-none select-none animate-pulse">
              404
            </div>
          </div>

          {/* Glassmorphism card */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 mb-8 border border-white/20 shadow-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Oops! Page Not Found
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              "The page you're looking for seems to have vanished into the digital void — this feature is still in the development phase, so check back soon!"
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="group relative px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
                onClick={() => navigate('/dashboard')} // 🏠 Go Home
              >
                <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
                Go Home
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </button>
            </div>
          </div>

          {/* Animated suggestions */}
          <div className="text-gray-400 space-y-2">
            <p className="flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Try refreshing the page
            </p>
            <p>Or check the URL for typos</p>
          </div>
        </div>
      </div>

      {/* Animated stars (also slowed down) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${5 + Math.random() * 4}s`, // slower: 5–9s
            }}
          />
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />
    </div>
  );
}
