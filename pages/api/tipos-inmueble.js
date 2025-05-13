// pages/api/tipos-inmueble.js
import sql from '../../lib/db';

export default async function handler(req, res) {
  try {
    const tipos = await sql`SELECT id, nombre FROM tipoinmueble`;
    res.status(200).json(tipos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener tipos de inmueble" });
  }
}
