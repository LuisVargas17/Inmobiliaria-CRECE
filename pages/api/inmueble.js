import multer from "multer";
import path from "path";
import fs from "fs/promises";
import sql from "../../lib/db";

// Configuración de Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const dir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`);
    },
  }),
});

const uploadMiddleware = upload.array("imagenes", 10);

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await runMiddleware(req, res, uploadMiddleware);

      const {
        titulo,
        descripcion,
        precio,
        direccion,
        ciudad,
        codigo_postal,
        tipo_inmueble,
        estatus,
        usuario_id,
        superficie_terreno,
        superficie_construida,
        antiguedad,
        niveles,
        recamaras,
        banos_completos,
        medios_banos,
        estacionamientos,
        amueblado
      } = req.body;

      const [inmueble] = await sql`
        INSERT INTO inmueble (
          titulo, descripcion, precio, direccion, ciudad, codigo_postal,
          tipo_inmueble, estatus, usuario_id,
          superficie_terreno, superficie_construida, antiguedad, niveles,
          recamaras, banos_completos, medios_banos, estacionamientos, amueblado
        )
        VALUES (
          ${titulo}, ${descripcion}, ${precio}, ${direccion}, ${ciudad}, ${codigo_postal},
          ${tipo_inmueble}, ${estatus}, ${usuario_id},
          ${superficie_terreno}, ${superficie_construida}, ${antiguedad}, ${niveles},
          ${recamaras}, ${banos_completos}, ${medios_banos}, ${estacionamientos}, ${amueblado}
        )
        RETURNING id
      `;

      if (req.files?.length) {
        for (const file of req.files) {
          const [lastOrder] = await sql`
            SELECT MAX(orden) AS max_order FROM imagenes WHERE inmueble_id = ${inmueble.id}
          `;
          const orden = lastOrder?.max_order ? lastOrder.max_order + 1 : 1;

          await sql`
            INSERT INTO imagenes (inmueble_id, url_imagen, orden)
            VALUES (${inmueble.id}, ${`/uploads/${file.filename}`}, ${orden})
          `;
        }
      }

      res.status(200).json({ message: "Inmueble guardado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al guardar el inmueble" });
    }
  }

  else if (req.method === "GET") {
    try {
      const inmuebles = await sql`
        SELECT 
          i.id, i.titulo, i.descripcion, i.precio, i.direccion, i.ciudad, 
          i.codigo_postal, ti.nombre AS tipo_nombre, i.estatus,
          i.superficie_terreno, i.superficie_construida, i.antiguedad, i.niveles,
          i.recamaras, i.banos_completos, i.medios_banos, i.estacionamientos, i.amueblado,
          img.url_imagen
        FROM inmueble i
        LEFT JOIN imagenes img ON i.id = img.inmueble_id
        LEFT JOIN tipoinmueble ti ON i.tipo_inmueble = ti.id
      `;

      const agrupados = inmuebles.reduce((acc, row) => {
        const existe = acc.find(i => i.id === row.id);
        if (existe) {
          if (row.url_imagen) existe.imagenes.push(row.url_imagen);
        } else {
          acc.push({
            id: row.id,
            titulo: row.titulo,
            descripcion: row.descripcion,
            precio: row.precio,
            direccion: row.direccion,
            ciudad: row.ciudad,
            codigo_postal: row.codigo_postal,
            tipo_inmueble: row.tipo_nombre,
            estatus: row.estatus,
            superficie_terreno: row.superficie_terreno,
            superficie_construida: row.superficie_construida,
            antiguedad: row.antiguedad,
            niveles: row.niveles,
            recamaras: row.recamaras,
            banos_completos: row.banos_completos,
            medios_banos: row.medios_banos,
            estacionamientos: row.estacionamientos,
            amueblado: row.amueblado,
            imagenes: row.url_imagen ? [row.url_imagen] : [],
          });
        }
        return acc;
      }, []);

      res.status(200).json(agrupados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los inmuebles" });
    }
  }

  else {
    res.status(405).end("Método no permitido");
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};





