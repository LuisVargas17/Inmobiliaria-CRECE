// lib/db.js
import { neon } from '@neondatabase/serverless';

// Crea la conexión a Neon
const sql = neon(process.env.DATABASE_URL);

export default sql;
