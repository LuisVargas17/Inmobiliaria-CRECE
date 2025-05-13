import Link from "next/link";
import { useEffect, useState } from "react";

const VerInmueble = () => {
  const [inmuebles, setInmuebles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInmuebles = async () => {
      try {
        const res = await fetch("/api/inmueble");
        const data = await res.json();

        if (res.status === 200) {
          setInmuebles(data);
        } else {
          setError(data.message || "No se encontraron inmuebles");
        }
      } catch (error) {
        setError("Error al cargar los inmuebles");
      } finally {
        setLoading(false);
      }
    };

    fetchInmuebles();
  }, []);

  if (loading) return <p className="info">Cargando...</p>;
  if (error) return <p className="info">{error}</p>;

  return (
    <div
      style={{
        backgroundImage: "url('/images/fondo-vi.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        position: "relative",
        paddingTop: "100px", // <- esto evita que se oculte el contenido bajo el navbar
      }}
    >
      {/* Fondo borroso superpuesto */}
      <div
        style={{
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, padding: "2rem" }}>
        {inmuebles.length > 0 ? (
          <div className="inmuebles-container">
            {inmuebles.map((inmueble) => (
  <Link key={inmueble.id} href={`/inmueble/${inmueble.id}`} legacyBehavior>
  <a className="inmueble-card">
    {inmueble.imagenes?.length > 0 && (
      <img
        src={`http://localhost:3000${inmueble.imagenes[0]}`}
        alt="Imagen principal"
        style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }}
      />
    )}
    <h2>{inmueble.titulo}</h2>
    <p className="price">Precio: ${parseFloat(inmueble.precio).toLocaleString()}</p>
    <p><strong>Ciudad:</strong> {inmueble.ciudad}</p>
    <p className="status"><strong>{inmueble.estatus}</strong></p>
  </a>
</Link>

))}

          </div>
        ) : (
          <p className="info">No hay inmuebles disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default VerInmueble;








