
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ msg: 'Invalid email' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(403).json({ msg: 'Wrong password' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  res
    .cookie('token', token, {
      httpOnly: true,
      secure: false, // set to true in production (when using HTTPS)
      sameSite: 'Lax'
    })
    console.log('🍪 Set-Cookie header:', res.getHeaders()['set-cookie']); // Log actual cookie header
res.json({ msg: 'Login successful' });
};
