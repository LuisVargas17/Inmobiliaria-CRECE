import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <div className="logo">
        <Link href="/">
        <img src="/images/logo.png" alt="CRECE Logo" />
        </Link>
      </div>
      <ul>
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/contactanos">Contactanos</Link></li>
      </ul>
      <div className="login-button">
        <Link href="/login"><button>Entrar</button></Link>
      </div>
    </nav>
  );
}


