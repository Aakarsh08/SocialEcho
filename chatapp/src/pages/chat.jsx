import { useEffect, useState, useRef } from 'react';
import socket from '../socket';
import axios from 'axios';

export default function Chat() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:7000/users/me', { withCredentials: true })
      .then((res) => setCurrentUserId(res.data.user))
      .catch((err) => console.error('Auth check failed:', err));
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    axios
      .get(`http://localhost:7000/users/all/${currentUserId}`, {
        withCredentials: true,
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error loading users:', err));
  }, [currentUserId]);

  useEffect(() => {
    if (!currentUserId) return;

    if (!socket.connected) {
      socket.connect();
    }

    const handleReceiveMessage = (msg) => {
      if (
        selectedUser &&
        ((msg.from === selectedUser._id && msg.to === currentUserId) ||
          (msg.from === currentUserId && msg.to === selectedUser._id))
      ) {
        setMessages((prev) => {
          const isDuplicate = prev.some(
            (prevMsg) =>
              prevMsg._id === msg._id ||
              (prevMsg.from === msg.from &&
                prevMsg.text === msg.text &&
                Math.abs(prevMsg.timestamp - msg.timestamp) < 1000)
          );
          if (isDuplicate) return prev;
          return [...prev, msg];
        });
      }
    };

    socket.on('receive-message', handleReceiveMessage);

    return () => {
      socket.off('receive-message', handleReceiveMessage);
    };
  }, [currentUserId, selectedUser]);

  const handleSend = () => {
    if (!text.trim() || !selectedUser) return;

    socket.emit('send-message', {
      to: selectedUser._id,
      text,
    });

    setText('');
  };

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    try {
      const res = await axios.get(
        `http://localhost:7000/chat/messages/${currentUserId}/${user._id}`,
        { withCredentials: true }
      );

      const normalizedMessages = res.data.map((msg) => ({
        ...msg,
        from: msg.sender,
        to: msg.sender === currentUserId ? user._id : currentUserId,
      }));

      setMessages(normalizedMessages);
    } catch (err) {
      console.error('Error loading chat messages:', err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (text.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [text]);

  if (!currentUserId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="flex h-screen relative z-10">
        {/* Sidebar */}
        <div className="w-1/3 bg-black/30 backdrop-blur-lg border-r border-white/10 flex flex-col">
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-bold text-white mb-2">Chats</h1>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm">Online</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
            {users.map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserSelect(user)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedUser?._id === user._id
                    ? 'bg-gradient-to-r from-purple-600/30 to-blue-500/30 backdrop-blur-sm border border-white/20 shadow-xl'
                    : 'bg-white/5 hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{user.username}</h3>
                    <p className="text-white/60 text-sm">Online</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <div className="bg-black/30 backdrop-blur-lg border-b border-white/10 p-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {selectedUser.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedUser.username}</h2>
                    <p className="text-white/60 text-sm">Active now</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                {messages.map((msg, i) => (
                  <div
                    key={msg._id || i}
                    className={`flex ${
                      msg.from === currentUserId ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 ${
                        msg.from === currentUserId
                          ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-br-md'
                          : 'bg-white/10 backdrop-blur-sm text-white rounded-bl-md border border-white/10'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.from === currentUserId
                            ? 'text-white/80'
                            : 'text-white/60'
                        }`}
                      >
                        {new Date(msg.createdAt || msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="bg-black/30 backdrop-blur-lg border-t border-white/10 p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type your message..."
                      className="w-full bg-black/30 border border-white/10 backdrop-blur-sm text-white placeholder-white/50 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!text.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-full p-3 transition-all duration-300 transform hover:scale-110 disabled:scale-100 shadow-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Welcome to Chat</h3>
                <p className="text-white/60 text-lg">Select a user to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
