import jwt from 'jsonwebtoken';

export const verifySocketToken = (cookieHeader) => {
  if (!cookieHeader) return null;

  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => c.trim().split('='))
  );

  const token = cookies.token;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id; // same as req.user = decoded
  } catch {
    return null;
  }
};
