import React from "react";
import { useRouter } from "next/router";

const Inicio = () => {
  const router = useRouter();

  const handleRedirect = (section) => {
    // Cambiar la redirección dependiendo de la sección seleccionada
    if (section === "seccion1") {
      router.push("/ver-inmueble");
    } else if (section === "seccion2") {
      router.push("/publicar-inmueble");
    } else if (section === "seccion3") {
      router.push("/seccion3");
    }
  };

  return (
    <div className="inicio-container">
      <h1>¿Qué quieres hacer?</h1>
      <div className="buttons-container">
        <button className="button" onClick={() => handleRedirect("seccion1")}>
          VER PROPIEDADES
        </button>
        <button className="button" onClick={() => handleRedirect("seccion2")}>
          PUBLICA TU INMUEBLE
        </button>
        <button className="button" onClick={() => handleRedirect("seccion3")}>
          OTRA OPCION
        </button>
      </div>
    </div>
  );
};

export default Inicio;
