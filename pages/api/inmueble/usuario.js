import { parse } from "cookie";
import jwt from "jsonwebtoken";
import sql from "../../../lib/db"; // ajusta si tienes otra ruta

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end("Método no permitido");

  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.session_token;

    if (!token) return res.status(401).json({ message: "No autenticado" });

    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userId = user.id;

    const inmuebles = await sql`
      SELECT *
      FROM inmueble
      WHERE usuario_id = ${userId}
      ORDER BY id DESC
    `;

    res.status(200).json(inmuebles);
  } catch (error) {
    console.error("Error obteniendo inmuebles del usuario:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
