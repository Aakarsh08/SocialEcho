import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../assets/loginbg.jpg';

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

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 flex-col' style={{ backgroundImage: `url(${bgImage})` }}>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 drop-shadow-lg text-center pt-10">
    Hop on to <span className="text-red-300">SOCIAL ECHO</span>
  </h1>
      <form
        className='min-w-[300px] flex flex-col items-center justify-center gap-4 p-8 border border-gray-300 rounded-xl bg-pink-400 shadow-md mx-auto my-auto h-fit font-mono text-white'
        onSubmit={handleSignup}
        style={{ maxWidth: '400px', margin: 'auto' }}
      >
        <h2 className='bold text-xl'>Signup</h2>
        <input
          className='border border-gray-300 p-2 rounded w-full mb-4 text-pink-400'
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          className='border border-gray-300 p-2 rounded w-full mb-4 text-pink-400'
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className='border border-gray-300 p-2 rounded w-full mb-4 text-pink-400'
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <div className='flex gap-3'>
          <button className='bg-white border rounded-3xl px-3 text-pink-400' type="submit">Signup</button>
          <Link to="/login" className='text-white underline'>Login?</Link>
        </div>
      </form>
    </div>
  );
}
