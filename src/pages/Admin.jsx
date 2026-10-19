

import { useNavigate } from "react-router-dom";
import { cerrarSesion } from "../auth/auth";

function Admin() {
    const navegar = useNavigate();

    function salir(){
        cerrarSesion();
        navegar("/login");
    }
    return (
        <section className="contacto">
            <h2>Pnale de Administracion</h2>
            <p>Bienvenido al sistema de Gas el Volcan</p>
            <p>Desde aqui podras administrar la distribuidora.</p>

            <button className="boton-principal" onClick={salir}>
                Cerrar Sesion
            </button>
        </section>
    );
}
export default Admin;