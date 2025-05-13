import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // Para mostrar errores
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (res.status === 200) {
      // Redirigir al dashboard después de un inicio de sesión exitoso
      router.push("/usuario");
    } else {
      setError(result.message);  // Muestra el error si las credenciales son incorrectas
    }
  };

  return (
    <div className="login-container">
      <h1>Inicia sesión con tu cuenta</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        {/* Muestra el error si lo hay */}
        {error && <p>{error}</p>}

        <button type="submit" className="submit-btn">
          Iniciar sesión
        </button>
      </form>

      <div className="auth-links">
        <Link href="/registro">¿No tienes una cuenta? Regístrate</Link> {/* Enlace para ir al registro */}
        <br />
        <Link href="/forgot-password">¿Olvidaste tu contraseña?</Link> {/* Enlace para ir a la recuperación de contraseña */}
      </div>
    </div>
  );
};

export default Login;







