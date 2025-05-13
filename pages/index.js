import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Map from '../components/Map';
import Link from 'next/link';



export default function Home() {
  // Función que maneja el clic en las imágenes
  const handleImageClick = (imageName) => {
    alert(`Has hecho clic en la imagen: ${imageName}`);
    // Aquí puedes agregar cualquier acción que necesites, como redirigir a una página
  };

  return (
    <div>
      <Navbar />
      
      {/* Sección de publicar inmueble */}
<section className="publicar-inmueble">
  <h1>
    CRECE
  </h1>
  <h2>
    El sitio web para publicar
  </h2>
  <h1>
    <span>TU INMOBILIARIA</span>
  </h1>
  <p>Hazlo fácilmente y alcanza más clientes</p>
  <Link href="/contactanos">
    <button>Empieza hoy</button>
  </Link>
  

        

        
</section>


      
      {/* Sección de propiedades */}
      <section className="mas-propiedades">
        <h2>Más de XXX propiedades disponibles</h2>
        <div className="imagenes">
          {/* Aquí las imágenes funcionan como botones */}
          <img
            src="/images/casa1.jpg"
            alt="propiedad1"
            onClick={() => handleImageClick("Casa 1")}
            className="property-image"
          />
          <img
            src="/images/casa2.jpg"
            alt="propiedad2"
            onClick={() => handleImageClick("Casa 2")}
            className="property-image"
          />
          <img
            src="/images/casa3.jpg"
            alt="propiedad3"
            onClick={() => handleImageClick("Casa 3")}
            className="property-image"
          />
        </div>
        <Link href="/contactanos">
          <button>Publica la tuya</button>
        </Link>
      </section>
      
      {/* Sección de mapa y ubicación */}
      <section style={{ padding: '50px' }}>
        <h2>Ubicación en la zona metropolitana de Tuxtla</h2>
        <p>
          Estrategicamente ubicado en el corazón de Tuxtla Gutiérrez.
        </p>
        <Map />
        <Link href="/contactanos">
          <button>Ver ubicación</button>
        </Link>
      </section>

{/* Sección de servicios */}
<section className="servicios">
  <h2>Nuestros servicios</h2>
  <div className="imagenes">
    <div className="servicio">
      <Link href="/comercial">
        <img src="/images/comercial.jpg" alt="Comercial" />
        <p>Comercial</p>
      </Link>
    </div>
    <div className="servicio">
      <Link href="/residencial">
        <img src="/images/residencial.jpg" alt="Residencial" />
        <p>Residencial</p>
      </Link>
    </div>
    <div className="servicio">
      <Link href="/luxury">
        <img src="/images/luxury.jpg" alt="Luxury" />
        <p>Luxury</p>
      </Link>
    </div>
  </div>
</section>


   
      {/* Sección Conocenos */}
      <section className="conocenos">
        <div className="conocenos-content">
          <div className="conocenos-text">
            <h2>CONOCENOS</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit parturient
              id turpis augue, condimentum dui egestas vitae tincidunt
              porttitor enim tellus molestie. Nam vestibulum gravida cras proin
              ac nulla erat nostra fames sed neque eleifend magna ut, sollicitudin
              a nullam fringilla bibendum mus orci accumsan pretium inceptos
              curabitur velit. Curabitur metus purus sapien eget habitant vehicula
              cubilia, mollis tristique nostra molestie interdum commodo aptent,
              id consequat laoreet aliquet placerat elementum.
            </p>
          </div>
          <div className="conocenos-logo">
            <img src="/images/logo.png" alt="CRECE Logo" />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
