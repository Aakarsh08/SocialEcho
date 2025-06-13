// components/PostCard.jsx
export default function PostCard({ post }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <p><strong>{post.author?.username || 'Unknown'}</strong></p>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" style={{ maxWidth: '100%', marginTop: '0.5rem' }} />}
    </div>
  );
}
