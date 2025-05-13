import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  try {
    const cookies = parse(req.headers.cookie || '');
    const sessionToken = cookies.session_token;

    if (!sessionToken) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    // ✅ Verificar y decodificar JWT
    const user = jwt.verify(sessionToken, process.env.JWT_SECRET);

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error en /api/me', error.message);
    return res.status(500).json({ message: 'Error al leer la sesión' });
  }
}
