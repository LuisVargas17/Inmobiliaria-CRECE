import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.session_token;

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      authenticated: true,
      user: decoded,
    });

  } catch (error) {
    return res.status(401).json({ authenticated: false });
  }
}

