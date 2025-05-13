import { serialize } from 'cookie';

export default function handler(req, res) {
  // Elimina la cookie 'session_token' estableciéndola con maxAge negativo
  res.setHeader('Set-Cookie', serialize('session_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: -1, // Esto hace que el navegador la elimine
  }));

  res.status(200).json({ message: 'Sesión cerrada correctamente' });
}
