import { parse } from 'cookie';

export default async function handler(req, res) {
  try {
    const cookies = parse(req.headers.cookie || '');

    const sessionToken = cookies.session_token;

    if (!sessionToken) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    const user = JSON.parse(sessionToken);

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error en /api/me', error);
    return res.status(500).json({ message: 'Error al leer la sesión' });
  }
}
