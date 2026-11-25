import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar({ unidadesCarrito }) {
  const { autenticado, role, username, logout } = useAuth();
  const navegar = useNavigate();

  function salir() {
    logout();
    navegar("/login");
  }

  return (
    <nav className="menu menu-paginas">
      <NavLink to="/" end>
        Inicio
      </NavLink>

      <NavLink to="/productos">
        Cilindros
      </NavLink>

      <NavLink to="/carrito">
        Carrito ({unidadesCarrito})
      </NavLink>

      <NavLink to="/contacto">
        Contacto
      </NavLink>

      {role === "ADMIN" && <NavLink to="/admin">Admin</NavLink>}

      {autenticado ? (
        <button type="button" className="boton-principal" onClick={salir}>
          Salir ({username})
        </button>
      ) : (
        <NavLink to="/login">Ingresar</NavLink>
      )}
    </nav>
  );
}

export default Navbar;