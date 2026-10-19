import { NavLink } from "react-router-dom";

function Navbar({ unidadesCarrito}) {
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

        </nav>
    );
}
export default Navbar;