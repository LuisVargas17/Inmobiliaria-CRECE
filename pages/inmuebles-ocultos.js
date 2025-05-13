import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function InmueblesOcultos() {
  const [inmuebles, setInmuebles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const obtenerOcultos = async () => {
      try {
        const res = await fetch("/api/inmueble/ocultos");
        if (!res.ok) throw new Error("No autenticado");
        const data = await res.json();
        setInmuebles(data);
      } catch (err) {
        console.error("No autenticado o error de sesión");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    obtenerOcultos();
  }, []);

  const publicarInmueble = async (id) => {
    if (!confirm("¿Deseas volver a publicar este inmueble?")) return;

    try {
      const res = await fetch(`/api/inmueble/desocultar?id=${id}`, {
        method: "PATCH",
      });

      if (res.ok) {
        alert("Inmueble publicado nuevamente");
        setInmuebles(inmuebles.filter((i) => i.id !== id));
      } else {
        const err = await res.json();
        alert("Error: " + err.message);
      }
    } catch (error) {
      console.error("Error al publicar:", error);
      alert("Error al intentar publicar el inmueble.");
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando inmuebles ocultos...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Inmuebles Ocultos</h1>
      {inmuebles.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tienes inmuebles ocultos.</p>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {inmuebles.map((inmueble) => (
            <div key={inmueble.id} style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}>
              <h2>{inmueble.titulo}</h2>
              <p><strong>Ciudad:</strong> {inmueble.ciudad}</p>
              <p><strong>Precio:</strong> ${inmueble.precio}</p>
              <p><strong>Descripción:</strong> {inmueble.descripcion}</p>

              <button
                onClick={() => publicarInmueble(inmueble.id)}
                style={{
                  marginTop: "1rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#16a34a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Publicar de nuevo
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
