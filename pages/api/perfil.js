import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import sql from '../../lib/db';

export default async function handler(req, res) {
  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.session_token;
    if (!token) return res.status(401).json({ message: "No autenticado" });

    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userId = user.id;

    const [perfil] = await sql`
      SELECT nombre, telefono, email
      FROM usuario
      WHERE id = ${userId}
    `;

    if (!perfil) return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json(perfil);
  } catch (error) {
    console.error("Error obteniendo perfil:", error.message);
    res.status(500).json({ message: "Error al obtener perfil" });
  }
}
