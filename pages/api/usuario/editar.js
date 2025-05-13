import sql from '../../../lib/db';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.session_token;

    if (!token) return res.status(401).json({ message: 'No autenticado' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { nombre, telefono, email } = req.body;

    if (!nombre || !telefono || !email) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    await sql`
      UPDATE usuario
      SET nombre = ${nombre}, telefono = ${telefono}, email = ${email}
      WHERE id = ${userId}
    `;

    res.status(200).json({ message: 'Datos actualizados correctamente' });

  } catch (error) {
    console.error('Error al actualizar usuario:', error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

