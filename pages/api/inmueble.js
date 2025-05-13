// pages/api/inmueble.js
import sql from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const inmuebles = await sql`
        SELECT i.*, array_agg(img.url_imagen) AS imagenes
        FROM inmueble i
        LEFT JOIN imagenes img ON img.inmueble_id = i.id
        GROUP BY i.id
        ORDER BY i.id DESC
      `;
      res.status(200).json(inmuebles);
    } catch (err) {
      console.error("Error al obtener inmuebles:", err.message);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}






