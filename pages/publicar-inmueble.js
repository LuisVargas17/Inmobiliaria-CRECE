import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/publicarInmueble.module.css";

const FormularioInmueble = () => {
  const [formData, setFormData] = useState({
    titulo: "", descripcion: "", precio: "", direccion: "", ciudad: "",
    codigo_postal: "", tipo_inmueble: "", estatus: "", superficie_terreno: "",
    superficie_construida: "", antiguedad: "", niveles: "", recamaras: "",
    banos_completos: "", medios_banos: "", estacionamientos: "",
    amueblado: false, cocina_integral: false, closets: false,
    aire_acondicionado: false, cisterna: false, vigilancia: false
  });

  const [imagenes, setImagenes] = useState(null);
  const [tiposInmueble, setTiposInmueble] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/me");
      if (!res.ok) return router.replace("/login");
      const data = await res.json();
      setUsuarioId(data.user.id);
    };
    if (typeof window !== "undefined") fetchUser();
  }, []);

  useEffect(() => {
    const fetchTipos = async () => {
      const res = await fetch("/api/tipos-inmueble");
      const data = await res.json();
      setTiposInmueble(data);
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

    const res = await fetch("/api/inmueble", { method: "POST", body: data });
    if (res.ok) router.push("/ver-inmueble");
    else alert("Error al guardar el inmueble");
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.formBox}>
        <h2>Datos del Inmueble</h2>

        <input name="titulo" className={styles.input} placeholder="Título" onChange={handleChange} required />
        <textarea name="descripcion" className={styles.textarea} placeholder="Descripción" onChange={handleChange} required />
        <input name="precio" type="number" className={styles.input} placeholder="Precio" onChange={handleChange} required />
        <input name="direccion" className={styles.input} placeholder="Dirección" onChange={handleChange} required />
        <input name="ciudad" className={styles.input} placeholder="Ciudad" onChange={handleChange} required />
        <input name="codigo_postal" className={styles.input} placeholder="Código Postal" onChange={handleChange} required />

        <select name="tipo_inmueble" className={styles.select} onChange={handleChange} required>
          <option value="">Tipo de Inmueble</option>
          {tiposInmueble.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
          ))}
        </select>

        <input name="estatus" className={styles.input} placeholder="Estatus" onChange={handleChange} required />
        <input name="superficie_terreno" type="number" className={styles.input} placeholder="Superficie del terreno (m²)" onChange={handleChange} />
        <input name="superficie_construida" type="number" className={styles.input} placeholder="Superficie construida (m²)" onChange={handleChange} />
        <input name="antiguedad" type="number" className={styles.input} placeholder="Antigüedad (años)" onChange={handleChange} />
        <input name="niveles" type="number" className={styles.input} placeholder="Niveles / Pisos" onChange={handleChange} />
        <input name="recamaras" type="number" className={styles.input} placeholder="Número de recámaras" onChange={handleChange} />
        <input name="banos_completos" type="number" className={styles.input} placeholder="Baños completos" onChange={handleChange} />
        <input name="medios_banos" type="number" className={styles.input} placeholder="Medios baños" onChange={handleChange} />
        <input name="estacionamientos" type="number" className={styles.input} placeholder="Estacionamientos" onChange={handleChange} />

        <input type="file" multiple className={styles.file} onChange={(e) => setImagenes(e.target.files)} />

        <button type="submit" className={styles.submitButton}>Guardar Inmueble</button>
      </form>
    </div>
  );
};

export default FormularioInmueble;








