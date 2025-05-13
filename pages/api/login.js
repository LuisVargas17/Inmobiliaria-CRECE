import { serialize } from 'cookie';
import sql from '../../lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const users = await sql`
        SELECT * FROM usuario WHERE email = ${email}
      `;

      if (users.length === 0) {
        return res.status(401).json({ message: "Correo o contraseña incorrectos" });
      }

      const user = users[0];
      const passwordMatch = await bcrypt.compare(password, user.contraseña);

      if (passwordMatch) {
        const sessionToken = JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.nombre
        });

        res.setHeader('Set-Cookie', serialize('session_token', sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        }));

        return res.status(200).json({ message: "Usuario autenticado correctamente" });
      } else {
        return res.status(401).json({ message: "Correo o contraseña incorrectos" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}
