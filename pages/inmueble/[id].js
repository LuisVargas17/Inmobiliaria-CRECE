import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/DetalleInmueble.module.css";

const DetalleInmueble = () => {
  const { id } = useRouter().query;
  const [inmueble, setInmueble] = useState(null);
  const [editando, setEditando] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/inmueble/${id}`)
        .then((res) => res.json())
        .then((data) => setInmueble(data));
    }
  }, [id]);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          setUsuarioActual(data.user);
        }
      } catch (err) {
        console.error("No autenticado");
      }
    };

    obtenerUsuario();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInmueble((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const guardarCambios = async () => {
    const res = await fetch(`/api/inmueble/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inmueble),
    });

    if (res.ok) {
      alert("Cambios guardados");
      setEditando(false);
    } else {
      alert("No tienes permiso para editar este inmueble");
    }
  };

  if (!inmueble)
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.titulo}>{inmueble.titulo}</h1>

        {editando ? (
          <div className={styles.formGrid}>
            {[ 
              { name: "descripcion", label: "Descripción" },
              { name: "precio", label: "Precio", type: "number" },
              { name: "direccion", label: "Dirección" },
              { name: "ciudad", label: "Ciudad" },
              { name: "codigo_postal", label: "Código Postal" },
              { name: "superficie_terreno", label: "Terreno (m²)", type: "number" },
              { name: "superficie_construida", label: "Construcción (m²)", type: "number" },
              { name: "antiguedad", label: "Antigüedad", type: "number" },
              { name: "niveles", label: "Niveles", type: "number" },
              { name: "recamaras", label: "Recámaras", type: "number" },
              { name: "banos_completos", label: "Baños", type: "number" },
              { name: "medios_banos", label: "Medios Baños", type: "number" },
              { name: "estacionamientos", label: "Estacionamientos", type: "number" },
            ].map(({ name, label, type = "text" }) => (
              <div key={name} className={styles.inputGroup}>
                <label>{label}</label>
                <input
                  type={type}
                  name={name}
                  value={inmueble[name]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <label className={styles.checkboxGroup}>
              <input
                type="checkbox"
                name="amueblado"
                checked={inmueble.amueblado}
                onChange={handleChange}
              /> Amueblado
            </label>

            <button className={styles.guardarBtn} onClick={guardarCambios}>Guardar cambios</button>
          </div>
        ) : (
          <div className={styles.detalles}>
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

            <p style={{ marginTop: "1.5rem" }}>
              <strong>Publicado por:</strong> {inmueble.nombre_usuario}
            </p>

            <a
              href={`https://wa.me/52${inmueble.telefono_usuario.replace(/\D/g, '')}?text=${encodeURIComponent("Hola, vi tu propiedad en CRECE y me gustaría recibir más información.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              Contactar por WhatsApp
            </a>

            {usuarioActual?.id === inmueble.usuario_id && (
              <button className={styles.editarBtn} onClick={() => setEditando(true)}>Editar</button>
            )}
          </div>
        )}
      </div>

      {inmueble.imagenes?.length > 0 && (
        <div className={styles.imagenes}>
          {inmueble.imagenes.map((url, i) => (
            <img
              key={i}
              src={`http://localhost:3000${url}`}
              alt={`Imagen ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DetalleInmueble;

