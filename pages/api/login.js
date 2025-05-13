import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
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

      if (!passwordMatch) {
        return res.status(401).json({ message: "Correo o contraseña incorrectos" });
      }

      // ✅ Crear JWT firmado
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.nombre,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // ✅ Guardar token en cookie HttpOnly
      res.setHeader('Set-Cookie', serialize('session_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      }));

      return res.status(200).json({ message: "Usuario autenticado correctamente" });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}
