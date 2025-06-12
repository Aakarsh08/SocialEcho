import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:7000/api/register', {
        username,
        email,
        password
      });
      alert(res.data.msg);
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Signup</button>
    </form>
  );
}
