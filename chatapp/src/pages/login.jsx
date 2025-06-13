import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        withCredentials: true, // 🔒 Ensure cookie is saved
      });

      alert('Login successful');
      navigate('/dashboard');
      console.log('🔑 Token:', res.data.token); // Optional: You could remove this if using httpOnly cookie
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
