import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const FormularioInmueble = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    direccion: "",
    ciudad: "",
    codigo_postal: "",
    tipo_inmueble: "",
    estatus: "",
    superficie_terreno: "",
    superficie_construida: "",
    antiguedad: "",
    niveles: "",
    recamaras: "",
    banos_completos: "",
    medios_banos: "",
    estacionamientos: "",
    amueblado: false,
    cocina_integral: false,
    closets: false,
    aire_acondicionado: false,
    cisterna: false,
    vigilancia: false,
  });

  const [imagenes, setImagenes] = useState(null);
  const [tiposInmueble, setTiposInmueble] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) throw new Error("No autenticado");
        const data = await res.json();
        setUsuarioId(data.user.id);
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
        router.push("/login");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const res = await fetch("/api/tipos-inmueble");
        const data = await res.json();
        setTiposInmueble(data);
      } catch (error) {
        console.error("Error cargando tipos de inmueble:", error);
      }
    };
    fetchTipos();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuarioId) return alert("No se pudo identificar el usuario.");

    const data = new FormData();
    for (let key in formData) data.append(key, formData[key]);
    data.append("usuario_id", usuarioId);
    if (imagenes) Array.from(imagenes).forEach((img) => data.append("imagenes", img));

    try {
      const res = await fetch("/api/inmueble", {
        method: "POST",
        body: data,
      });
      if (res.ok) router.push("/ver-inmueble");
      else alert("Error al guardar el inmueble");
    } catch (error) {
      console.error("Error enviando formulario:", error);
      alert("Ocurrió un error inesperado.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "80vh",
          overflowY: "auto",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 style={{
  textAlign: "center",
  fontFamily: "'Cal Sans', sans-serif",
  marginBottom: "1rem"
}}>
  Datos del Inmueble
</h2>


        <input name="titulo" placeholder="Título" onChange={handleChange} required />
        <textarea
  name="descripcion"
  placeholder="Descripción"
  onChange={handleChange}
  required
  style={{
    width: "100%",
    minHeight: "100px", // Aquí el cambio importante
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
    boxSizing: "border-box"
  }}
/>


        <input name="precio" type="number" placeholder="Precio" onChange={handleChange} required />
        <input name="direccion" placeholder="Dirección" onChange={handleChange} required />
        <input name="ciudad" placeholder="Ciudad" onChange={handleChange} required />
        <input name="codigo_postal" placeholder="Código Postal" onChange={handleChange} required />

        <select
  name="tipo_inmueble"
  onChange={handleChange}
  required
  style={{
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
    boxSizing: "border-box"
  }}
>
  <option value="">Tipo de Inmueble</option>
  {tiposInmueble.map((tipo) => (
    <option key={tipo.id} value={tipo.id}>
      {tipo.nombre}
    </option>
  ))}
</select>


        <input name="estatus" placeholder="Estatus" onChange={handleChange} required />
        <input name="superficie_terreno" type="number" placeholder="Superficie del terreno (m²)" onChange={handleChange} />
        <input name="superficie_construida" type="number" placeholder="Superficie construida (m²)" onChange={handleChange} />
        <input name="antiguedad" type="number" placeholder="Antigüedad (años)" onChange={handleChange} />
        <input name="niveles" type="number" placeholder="Niveles / Pisos" onChange={handleChange} />
        <input name="recamaras" type="number" placeholder="Número de recámaras" onChange={handleChange} />
        <input name="banos_completos" type="number" placeholder="Baños completos" onChange={handleChange} />
        <input name="medios_banos" type="number" placeholder="Medios baños" onChange={handleChange} />
        <input name="estacionamientos" type="number" placeholder="Estacionamientos" onChange={handleChange} />

        <input type="file" multiple onChange={(e) => setImagenes(e.target.files)} />

        <button
          type="submit"
          style={{
            backgroundColor: "#4f46e5",
            color: "#fff",
            padding: "0.75rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Guardar Inmueble
        </button>
      </form>
    </div>
  );
};

export default FormularioInmueble;







