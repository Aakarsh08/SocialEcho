import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  // console.log("Signup route hit", req.body);
  const { username,email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: 'User exists' });
    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({ username,email, password: hash });
  await newUser.save();
  res.status(201).json({ msg: 'User registered' });
};
