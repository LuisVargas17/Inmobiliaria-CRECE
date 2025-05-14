import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import sql from "../../lib/db";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { credential } = req.body;

    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const { email, name } = payload;

      // Buscar o crear usuario en tu base de datos
      const users = await sql`SELECT * FROM usuario WHERE email = ${email}`;

      let user = users[0];
      if (!user) {
        // Crea un nuevo usuario si no existe (ajusta los campos a tu tabla)
        const newUsers = await sql`
          INSERT INTO usuario (nombre, email, contraseña)
          VALUES (${name}, ${email}, '')
          RETURNING *
        `;
        user = newUsers[0];
      }

      // Crear token JWT propio
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.nombre },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.setHeader(
        "Set-Cookie",
        serialize("session_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        })
      );

      return res.status(200).json({ message: "Autenticado con Google" });
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Token inválido" });
    }
  } else {
    return res.status(405).json({ message: "Método no permitido" });
  }
}
