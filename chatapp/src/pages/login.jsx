import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../assets/loginbg.jpg'; // Adjust the path as necessary
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

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 flex-col' style={{ backgroundImage: `url(${bgImage})` }}>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 drop-shadow-lg text-center pt-10 ">
    Hop on to <span className="text-red-300">SOCIAL ECHO</span>
  </h1>
      <form
        className='min-w-[300px] flex flex-col items-center justify-center gap-4 p-8 border border-gray-300 rounded-xl bg-pink-400 shadow-md mx-auto my-auto h-fit font-mono text-white '
        onSubmit={handleLogin}
        style={{ maxWidth: '400px' }}
      >
        <h2 className='bold text-xl'>Login</h2>
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
          <button className='bg-white border rounded-3xl px-3 text-pink-400' type="submit">Login</button>
          <Link to="/" className='text-white underline'>Signup?</Link>
        </div>
      </form>
    </div>
  );
}
