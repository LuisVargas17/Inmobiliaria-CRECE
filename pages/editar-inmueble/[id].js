import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/editarInmueble.module.css"; // <-- Asegúrate de usar la ruta correcta

export default function EditarInmueble() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/inmueble/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
        setLoading(false);
      })
      .catch(() => {
        alert("No se pudo cargar el inmueble");
        router.push("/tus-inmuebles");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/inmueble/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Inmueble actualizado");
      router.push("/tus-inmuebles");
    } else {
      alert("Error al actualizar");
    }
  };

  if (loading || !form) return <p style={{ textAlign: "center" }}>Cargando...</p>;

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Editar Inmueble</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Título</label>
          <input name="titulo" value={form.titulo} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Descripción</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Precio</label>
          <input name="precio" type="number" value={form.precio} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Ciudad</label>
          <input name="ciudad" value={form.ciudad} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Dirección</label>
          <input name="direccion" value={form.direccion} onChange={handleChange} />
        </div>

        <button type="submit" className={styles.submitButton}>
          Guardar cambios
        </button>
      </form>
    </div>
  );
}


