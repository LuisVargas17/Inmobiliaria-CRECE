import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/usuario.module.css"; // ✅ Importa el CSS

const Usuario = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const esMujer = (nombre) => {
    const nombreLower = nombre.toLowerCase();
    const nombresFemeninos = ["maria", "ana", "luisa", "sofia", "paula", "ines", "laura", "valeria", "josefina", "gabriela"];
    return nombresFemeninos.includes(nombreLower);
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/validate-session");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error al validar sesión:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleRedirect = (section) => {
    if (section === "seccion1") {
      router.push("/ver-inmueble");
    } else if (section === "seccion2") {
      router.push("/publicar-inmueble");
    } else if (section === "seccion3") {
      router.push("/tus-inmuebles");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout");
    router.push("/login");
  };

  if (loading) return <p>Cargando sesión...</p>;

  const primerNombre = user.name.split(" ")[0];
  const saludo = esMujer(primerNombre) ? "Bienvenida" : "Bienvenido";

  return (
    <div className={styles.container}>
      <h1 className={styles.saludo}>
        {saludo}, {primerNombre}
      </h1>

      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={() => handleRedirect("seccion1")}>
          VER PROPIEDADES
        </button>
        <button className={styles.button} onClick={() => handleRedirect("seccion2")}>
          PUBLICA TU INMUEBLE
        </button>
        <button className={styles.button} onClick={() => handleRedirect("seccion3")}>
          VER TUS INMUEBLES
        </button>
        <button className={`${styles.button} ${styles.logout}`} onClick={handleLogout}>
          CERRAR SESIÓN
        </button>
      </div>
    </div>
  );
};

export default Usuario;





