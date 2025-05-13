// pages/api/usuario/obtener.js
import sql from "../../../lib/db";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.session_token;

    if (!token) return res.status(401).json({ message: "No autenticado" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const [usuario] = await sql`
      SELECT id, nombre, telefono, email
      FROM usuario
      WHERE id = ${userId}
    `;

    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json({ user: usuario });

  } catch (error) {
    console.error("Error al obtener usuario:", error.message);
    res.status(500).json({ message: "Error al obtener datos" });
  }
}
