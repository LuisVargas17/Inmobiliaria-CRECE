import sql from '../../lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, telefono, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      await sql`
        INSERT INTO usuario (nombre, telefono, email, contraseña)
        VALUES (${name}, ${telefono}, ${email}, ${hashedPassword})
      `;
      res.status(200).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
      console.error("Error completo:", error);
      res.status(500).json({ 
        message: 'Hubo un error al registrar al usuario',
        error: error.message // Envía el mensaje de error al cliente para debugging
      });
    }
  }
}
