import { parse } from "cookie";
import jwt from "jsonwebtoken";
import sql from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "PATCH") return res.status(405).end("Método no permitido");

  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.session_token;
    if (!token) return res.status(401).json({ message: "No autenticado" });

    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userId = user.id;
    const { id } = req.query;

    // Validar propiedad del inmueble
    const [inmueble] = await sql`
      SELECT usuario_id FROM inmueble WHERE id = ${id}
    `;
    if (!inmueble || inmueble.usuario_id !== userId) {
      return res.status(403).json({ message: "No tienes permiso para modificar este inmueble" });
    }

    // Cambiar estatus a 'inactivo'
    await sql`
      UPDATE inmueble SET estatus = 'inactivo' WHERE id = ${id}
    `;

    return res.status(200).json({ message: "Inmueble ocultado correctamente" });

  } catch (error) {
    console.error("Error ocultando inmueble:", error.message);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
