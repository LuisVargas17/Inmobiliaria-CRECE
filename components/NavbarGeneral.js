import Link from "next/link";
import { useRouter } from "next/router";

const NavbarGeneral = () => {
  const router = useRouter();

  const routeTitles = {
    "/ver-inmueble": "Inmuebles",
    "/publicar-inmueble": "Publicar",
    "/contactanos": "Contacto",
    "/perfil": "Perfil",
  };

  const title = routeTitles[router.pathname] || "";

  return (
    <div
      style={{
        backgroundColor: "transparent", // fondo totalmente transparente
        padding: "1rem 2rem",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo izquierda */}
        <div style={{ flex: 1 }}>
          <Link href="/" legacyBehavior>
            <a
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "#000000",
                textDecoration: "none",
                fontFamily: "'Cal Sans', sans-serif",
              }}
            >
              CRECE
            </a>
          </Link>
        </div>

        {/* Título centro */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "'Cal Sans', sans-serif",
              fontWeight: "bold",
              margin: 0,
              fontSize: "1.7rem",
              color: "#1F1F1F",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Enlaces derecha */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: "1.5rem" }}>
          <Link href="/publicar-inmueble" legacyBehavior>
            <a style={{ color: "#000", textDecoration: "none", fontWeight: "500", fontFamily: "'Cal Sans', sans-serif" }}>
              Publicar
            </a>
          </Link>
          <Link href="/contactanos" legacyBehavior>
            <a style={{ color: "#000", textDecoration: "none", fontWeight: "500", fontFamily: "'Cal Sans', sans-serif" }}>
              Contacto
            </a>
          </Link>
          <Link href="/perfil" legacyBehavior>
            <a style={{ color: "#000", textDecoration: "none", fontWeight: "500", fontFamily: "'Cal Sans', sans-serif" }}>
              Perfil
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarGeneral;








