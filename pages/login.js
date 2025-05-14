import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import styles from "../styles/login.module.css"; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (res.status === 200) {
      router.push("/usuario");
    } else {
      setError(result.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch("/api/login-google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const result = await res.json();

      if (res.status === 200) {
        router.push("/usuario");
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error al iniciar sesión con Google", err);
      setError("Error al iniciar sesión con Google");
    }
  };

  return (
    <GoogleOAuthProvider clientId="557883966685-82si0r4n47sq0h24s309oj1d0n7q9p8p.apps.googleusercontent.com">
      <div className={styles["login-container"]}>
        <h1>Inicia sesión con tu cuenta</h1>
        <form onSubmit={handleSubmit} className={styles["login-form"]}>
          <div className={styles["input-group"]}>
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
          <div className={styles["input-group"]}>
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
          {error && <p className={styles["error-message"]}>{error}</p>}
          <button type="submit" className={styles["submit-btn"]}>
            Iniciar sesión
          </button>
        </form>

        <p style={{ marginTop: "1rem", textAlign: "center" }}>O inicia sesión con Google:</p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Error con Google Login")}
          />
        </div>

        <div className={styles["auth-links"]}>
          <Link href="/registro">¿No tienes una cuenta? Regístrate</Link>
          <br />
          <Link href="/forgot-password">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;









