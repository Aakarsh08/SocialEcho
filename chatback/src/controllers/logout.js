export const logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,    // set to true in production (HTTPS)
    sameSite: 'Lax',
    path: '/',        // must match path used when setting the cookie
  });

  return res.status(200).json({ msg: 'Logout successful' });
};
