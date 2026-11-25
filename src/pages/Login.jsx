import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const { login } = useAuth();
  const navegar = useNavigate();
  const location = useLocation();

  async function ingresar(e) {
    e.preventDefault();
    setError("");
    setEnviando(true);
    try {
      const sesion = await login(usuario.trim(), password);
      const destino = location.state?.from || (sesion.role === "ADMIN" ? "/admin" : "/productos");
      navegar(destino, { replace: true });
    } catch (err) {
      setError(err.status === 401 ? "Usuario o contraseña incorrectos" : err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="contacto">
      <h2>Iniciar sesión</h2>
      <p>Ingresa con tu cuenta de Gas El Volcán</p>

      <div className="login-contenedor">
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

          <button type="submit" disabled={enviando}>
            {enviando ? "Ingresando..." : "Ingresar"}
          </button>
          <p role="alert">{error}</p>
        </form>

        <aside className="login-demo">
          <h3>Cuentas de prueba</h3>
          <p><strong>Administrador:</strong> admin / Admin123!</p>
          <p><strong>Cliente:</strong> cliente / Cliente123!</p>
        </aside>
      </div>
    </section>
  );
}

export default Login;