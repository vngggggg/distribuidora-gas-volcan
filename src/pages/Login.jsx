

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../auth/auth";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navegar = useNavigate();

  function ingresar(e) {
    e.preventDefault();

    if (iniciarSesion(usuario, password)) {
      navegar("/admin");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  }

  return (
    <section className="contacto">
      <h2>Iniciar sesión</h2>
      <p>Acceso para administradores</p>

      <form className="formulario-contacto" onSubmit={ingresar}>
        <div className="campo-contacto">
          <label htmlFor="usuario">Usuario</label>
          <input
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div className="campo-contacto">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Ingresar</button>
      </form>

      <p role="alert">{error}</p>
    </section>
  );
}

export default Login;
