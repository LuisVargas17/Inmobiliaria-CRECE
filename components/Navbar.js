import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/navbar.module.css';

export default function Navbar() {
  const router = useRouter();

  const handleEntrarClick = async () => {
    try {
      const res = await fetch("/api/validate-session");
      const data = await res.json();

      if (res.ok && data.authenticated) {
        router.push("/usuario");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error al validar sesión:", error);
      router.push("/login");
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/images/logo.png" alt="CRECE Logo" />
        </Link>
      </div>

      <ul className={styles.navList}>
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/contactanos">Contáctanos</Link></li>
      </ul>

      <div className={styles.loginButton}>
        <button className={styles.indexButton} onClick={handleEntrarClick}>
          Entrar
        </button>
      </div>
    </nav>
  );
}




