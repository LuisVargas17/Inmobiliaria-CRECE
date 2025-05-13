// pages/api/inmueble/[id].js
import sql from "../../../lib/db";
import { parse } from "cookie";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const rows = await sql`
        SELECT 
          i.id, i.titulo, i.descripcion, i.precio, i.direccion,
          i.ciudad, i.codigo_postal, i.tipo_inmueble,
          i.estatus, i.superficie_terreno, i.superficie_construida,
          i.antiguedad, i.niveles, i.recamaras,
          i.banos_completos, i.medios_banos, i.estacionamientos,
          i.amueblado, i.usuario_id,
          ARRAY_AGG(img.url_imagen) AS imagenes
        FROM inmueble i
        LEFT JOIN imagenes img ON i.id = img.inmueble_id
        WHERE i.id = ${id}
        GROUP BY i.id
      `;

      if (rows.length === 0) {
        return res.status(404).json({ message: "Inmueble no encontrado" });
      }

      res.status(200).json(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el inmueble" });
    }
  }

  else if (req.method === "PUT") {
    try {
      const cookies = parse(req.headers.cookie || '');
      const sessionToken = cookies.session_token;
      if (!sessionToken) return res.status(401).json({ message: "No autenticado" });

      const user = JSON.parse(sessionToken);
      const userId = user.id;

      // Validar que el inmueble pertenece al usuario
      const [ownerCheck] = await sql`
        SELECT usuario_id FROM inmueble WHERE id = ${id}
      `;
      if (!ownerCheck || ownerCheck.usuario_id !== userId) {
        return res.status(403).json({ message: "No tienes permiso para modificar este inmueble" });
      }

      const {
        titulo, descripcion, precio, direccion, ciudad, codigo_postal,
        tipo_inmueble, estatus, superficie_terreno, superficie_construida,
        antiguedad, niveles, recamaras, banos_completos,
        medios_banos, estacionamientos, amueblado
      } = req.body;

      await sql`
        UPDATE inmueble SET
          titulo = ${titulo},
          descripcion = ${descripcion},
          precio = ${precio},
          direccion = ${direccion},
          ciudad = ${ciudad},
          codigo_postal = ${codigo_postal},
          tipo_inmueble = ${tipo_inmueble},
          estatus = ${estatus},
          superficie_terreno = ${superficie_terreno},
          superficie_construida = ${superficie_construida},
          antiguedad = ${antiguedad},
          niveles = ${niveles},
          recamaras = ${recamaras},
          banos_completos = ${banos_completos},
          medios_banos = ${medios_banos},
          estacionamientos = ${estacionamientos},
          amueblado = ${amueblado}
        WHERE id = ${id}
      `;

      res.status(200).json({ message: "Inmueble actualizado" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el inmueble" });
    }
  }

  else {
    res.status(405).end("Método no permitido");
  }
}


