import React, { useState } from "react";
import Link from "next/link";

const Registro = () => {
  // Estados para capturar los valores del formulario
  const [name, setName] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      telefono: telefono,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Enviamos los datos al backend
      });

      const result = await response.json();
      setMessage(result.message);

      if (response.status === 200) {
        // Si el registro fue exitoso, redirigir al login o hacer algo
        console.log("Usuario registrado correctamente");
      } else {
        console.log("Error al registrar el usuario");
      }
    } catch (error) {
      console.error("Hubo un error al hacer la solicitud:", error);
    }
  };

  return (
    <div className="register-container">
      <h1>Regístrate con tu cuenta</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa tu nombre"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ingresa tu teléfono"
            required
          />
        </div>

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

        <button type="submit" className="submit-btn">
          Regístrate
        </button>
      </form>

      {message && <p>{message}</p>}  {/* Mostrar mensaje de respuesta del servidor */}

      <div className="auth-links">
        <Link href="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
      </div>
    </div>
  );
};

export default Registro;

