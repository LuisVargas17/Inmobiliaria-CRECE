import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/tusInmuebles.module.css";

export default function TusInmuebles() {
  const [inmuebles, setInmuebles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/inmueble/usuario")
      .then((res) => res.json())
      .then((data) => setInmuebles(data));
  }, []);

  const eliminarInmueble = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este inmueble?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/inmueble/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setInmuebles((prev) => prev.filter((i) => i.id !== id));
      } else {
        alert("No se pudo eliminar el inmueble.");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const ocultarInmueble = async (id) => {
    try {
      const res = await fetch(`/api/inmueble/ocultar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setInmuebles((prev) => prev.filter((i) => i.id !== id));
      } else {
        alert("No se pudo ocultar el inmueble.");
      }
    } catch (error) {
      console.error("Error al ocultar:", error);
    }
  };

  const editarInmueble = (id) => {
    router.push(`/editar-inmueble/${id}`); // ✅ CORREGIDO
  };

  return (
    <div className={styles.container}>
      {inmuebles.map((i) => (
        <div key={i.id} className={styles.card}>
          <h3>{i.titulo}</h3>
          <p><strong>Ciudad:</strong> {i.ciudad}</p>
          <p><strong>Precio:</strong> ${parseFloat(i.precio).toFixed(2)}</p>
          <p><strong>Descripción:</strong> {i.descripcion}</p>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${styles.editar}`}
              onClick={() => editarInmueble(i.id)}
            >
              Editar
            </button>
            <button
              className={`${styles.button} ${styles.ocultar}`}
              onClick={() => ocultarInmueble(i.id)}
            >
              Ocultar
            </button>
            <button
              className={`${styles.button} ${styles.eliminar}`}
              onClick={() => eliminarInmueble(i.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}





