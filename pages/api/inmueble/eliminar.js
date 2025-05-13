import { parse } from "cookie";
import jwt from "jsonwebtoken";
import sql from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).end("Método no permitido");

  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.session_token;

    if (!token) return res.status(401).json({ message: "No autenticado" });

    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userId = user.id;
    const { id } = req.query;

    // Verifica que el inmueble sea del usuario actual
    const [inmueble] = await sql`
      SELECT usuario_id FROM inmueble WHERE id = ${id}
    `;

    if (!inmueble || inmueble.usuario_id !== userId) {
      return res.status(403).json({ message: "No autorizado para eliminar este inmueble" });
    }

    // Primero elimina imágenes si las hay
    await sql`DELETE FROM imagenes WHERE inmueble_id = ${id}`;

    // Luego elimina el inmueble
    await sql`DELETE FROM inmueble WHERE id = ${id}`;

    res.status(200).json({ message: "Inmueble eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar inmueble:", error.message);
    res.status(500).json({ message: "Error al eliminar el inmueble" });
  }
}
