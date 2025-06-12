import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log('No token found in cookies');
    return res.status(401).json({ msg: 'No token. Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Save user ID to use later
    next(); // Token valid, go to next middleware/route
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};
