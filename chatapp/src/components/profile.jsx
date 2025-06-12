// components/Profile.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
  axios.get('http://localhost:7000/api/profile', {
    withCredentials: true   // ⬅️ must be there!
  })
  .then(res => {
    console.log('✅ Frontend received response:', res);
    setMsg(res.data.msg);
  })
  .catch(err => {
    console.error('❌ Frontend error:', err.response);
    setError(err.response?.data?.msg || 'Access denied');
  });
}, []);


  return (
    <div>
      <h2>Protected Profile Route</h2>
      {msg && <p>{msg}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
