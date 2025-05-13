import '../styles/globals.css';
import { useRouter } from 'next/router';
import NavbarInicio from '../components/Navbar';       // Navbar exclusivo para la página de inicio
import NavbarGeneral from '../components/NavbarGeneral';     // Navbar general para las demás páginas

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Verifica si estás en la página de inicio
  const isInicio = router.pathname === '/';

  return (
    <>
      {isInicio ? <NavbarInicio /> : <NavbarGeneral />}
      <main className="pt-20 px-4"> {/* pt-20 = padding top para dejar espacio del navbar fijo */}
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
