// components/CreatePostForm.jsx
import { useState } from 'react';
import axios from 'axios';

export default function CreatePostForm({ setPosts }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:7000/posts/upload', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPosts(prev => [res.data.post, ...prev]); // update feed
      setContent('');
      setImage(null);
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to post');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={3}
        style={{ width: '100%' }}
      />
      <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
      <button type="submit">Post</button>
    </form>
  );
}
