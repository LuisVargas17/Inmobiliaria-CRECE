import { useEffect, useState } from "react";
import styles from "../styles/perfil.module.css";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", telefono: "", email: "" });

  const cargarUsuario = async () => {
    try {
      const res = await fetch("/api/usuario/obtener");
      const data = await res.json();
      setUsuario(data.user);
      setFormData({
        nombre: data.user.nombre,
        telefono: data.user.telefono || "",
        email: data.user.email,
      });
    } catch (err) {
      console.error("Error al cargar el usuario desde la base de datos:", err);
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const guardarCambios = async () => {
    try {
      const res = await fetch("/api/usuario/editar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await cargarUsuario();
        setEditando(false);
        alert("Datos actualizados correctamente");
      } else {
        alert("Error al actualizar los datos");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error inesperado");
    }
  };

  if (!usuario) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando perfil...</p>;

  const primerNombre = usuario.nombre?.split(" ")[0] || "Usuario";

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Inmobiliaria de {primerNombre}</h2>
        <p className={styles.subtext}>Información del usuario</p>

        {editando ? (
          <>
            <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre completo" className={styles.input} />
            <input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" className={styles.input} />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Correo" className={styles.input} />

            <button onClick={guardarCambios} className={styles.primaryButton}>
              Guardar cambios
            </button>
          </>
        ) : (
          <>
            <p className={styles.infoText}><strong>Nombre:</strong> {usuario.nombre}</p>
<p className={styles.infoText}><strong>Teléfono:</strong> {usuario.telefono}</p>
<p className={styles.infoText}><strong>Correo:</strong> {usuario.email}</p>


            <button onClick={() => setEditando(true)} className={styles.primaryButton}>
              Editar perfil
            </button>
          </>
        )}
      </div>

      {!editando && (
        <div className={styles.secondaryContainer}>
          <a href="/inmuebles-ocultos">
  <button className={`${styles.secondaryButton} ${styles.verOcultos}`}>
    Ver inmuebles ocultos
  </button>
</a>

<a href="/tus-inmuebles">
  <button className={`${styles.secondaryButton} ${styles.verPublicados}`}>
    Ver inmuebles publicados
  </button>
</a>

        </div>
      )}
    </div>
  );
}
