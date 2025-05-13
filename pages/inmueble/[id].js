import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetalleInmueble = () => {
  const { id } = useRouter().query;
  const [inmueble, setInmueble] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/inmueble/${id}`)
        .then((res) => res.json())
        .then((data) => setInmueble(data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInmueble((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const guardarCambios = async () => {
    await fetch(`/api/inmueble/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inmueble),
    });
    alert("Cambios guardados");
    setEditando(false);
  };

  if (!inmueble) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando...</p>;

  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "15px",
        maxWidth: "700px",
        width: "100%",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      }}>
        <h1 style={{
          textAlign: "center",
          color: "#000000",
          fontSize: "2rem",
          fontFamily: "'Cal Sans', sans-serif",
          fontWeight: '500',
          marginBottom: "1rem"
        }}>{inmueble.titulo}</h1>

        {editando ? (
          <div style={{ display: "grid", gap: "1rem" }}>
            {[
              "descripcion", "precio", "direccion", "ciudad", "codigo_postal",
              "superficie_terreno", "superficie_construida", "antiguedad", "niveles",
              "recamaras", "banos_completos", "medios_banos", "estacionamientos"
            ].map((campo) => (
              <input
                key={campo}
                name={campo}
                value={inmueble[campo]}
                onChange={handleChange}
                placeholder={campo.replaceAll("_", " ")}
              />
            ))}
            <label>
              <input
                type="checkbox"
                name="amueblado"
                checked={inmueble.amueblado}
                onChange={handleChange}
              /> Amueblado
            </label>
            <button onClick={guardarCambios} style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer"
            }}>Guardar</button>
          </div>
        ) : (
          <div style={{ lineHeight: "1.8" }}>
            <p><strong>Descripción:</strong> {inmueble.descripcion}</p>
            <p><strong>Precio:</strong> ${inmueble.precio}</p>
            <p><strong>Dirección:</strong> {inmueble.direccion}</p>
            <p><strong>Ciudad:</strong> {inmueble.ciudad}</p>
            <p><strong>Código Postal:</strong> {inmueble.codigo_postal}</p>
            <p><strong>Terreno:</strong> {inmueble.superficie_terreno} m²</p>
            <p><strong>Construcción:</strong> {inmueble.superficie_construida} m²</p>
            <p><strong>Antigüedad:</strong> {inmueble.antiguedad} años</p>
            <p><strong>Niveles:</strong> {inmueble.niveles}</p>
            <p><strong>Recámaras:</strong> {inmueble.recamaras}</p>
            <p><strong>Baños:</strong> {inmueble.banos_completos}</p>
            <p><strong>Medios Baños:</strong> {inmueble.medios_banos}</p>
            <p><strong>Estacionamientos:</strong> {inmueble.estacionamientos}</p>
            <p><strong>Amueblado:</strong> {inmueble.amueblado ? "Sí" : "No"}</p>

            <button onClick={() => setEditando(true)} style={{
              marginTop: "1rem",
              backgroundColor: "#10B981",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer"
            }}>Editar</button>
          </div>
        )}
      </div>

      {/* Imágenes afuera de la tarjeta */}
      {inmueble.imagenes?.length > 0 && (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "2rem"
        }}>
          {inmueble.imagenes.map((url, i) => (
            <img
              key={i}
              src={`http://localhost:3000${url}`}
              alt={`Imagen ${i + 1}`}
              style={{
                width: "220px",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DetalleInmueble;





