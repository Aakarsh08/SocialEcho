// components/FollowCard.jsx
import { useState } from 'react';
import axios from 'axios';

export default function FollowCard({ user }) {
//   const [isFollowing, setIsFollowing] = useState(false); // placeholder

//   const handleFollow = async () => {
//     try {
//       await axios.post(`http://localhost:7000/api/follow/${user._id}`, {}, {
//         withCredentials: true
//       });
//       setIsFollowing(true);
//     } catch (err) {
//       console.error('❌ Follow failed:', err);
//     }
//   };

  return (
    // <div style={{
    //   border: '1px solid #eee',
    //   padding: '0.5rem',
    //   marginBottom: '0.5rem',
    //   display: 'flex',
    //   justifyContent: 'space-between',
    //   alignItems: 'center'
    // }}>
    //   <span>{user.username}</span>
    //   <button onClick={handleFollow} disabled={isFollowing}>
    //     {isFollowing ? 'Following' : 'Follow'}
    //   </button>
    // </div>
    <>
    <div>FOLLOW CARD</div>
    </>
  );
}
