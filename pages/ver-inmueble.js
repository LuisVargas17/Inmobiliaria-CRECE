import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/verInmueble.module.css";

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
        paddingTop: "100px",
      }}
    >
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
      <div className={styles.container}>
        <div className={styles.inmueblesGrid}>
          {inmuebles.map((inmueble) => (
            <Link key={inmueble.id} href={`/inmueble/${inmueble.id}`} legacyBehavior>
              <a className={styles.card}>
                {inmueble.imagenes?.length > 0 && (
                  <img
                    src={`http://localhost:3000${inmueble.imagenes[0]}`}
                    alt="Imagen del inmueble"
                    className={styles.image}
                  />
                )}
                <div className={styles.content}>
                  <h2 className={styles.title}>{inmueble.titulo}</h2>
                  <p className={styles.price}>${parseFloat(inmueble.precio).toLocaleString()}</p>
                  <p className={styles.ciudad}><strong>Ciudad:</strong> {inmueble.ciudad}</p>
                  <p className={styles.status}>{inmueble.estatus}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerInmueble;
