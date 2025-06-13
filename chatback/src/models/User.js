import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: {
    type: String,
    default: 'https://example.com/default-avatar.png', // use your own default avatar URL
  },
});

export default mongoose.model('User', userSchema);
