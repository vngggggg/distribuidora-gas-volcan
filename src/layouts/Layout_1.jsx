import { Outlet } from "react-router-dom";
import Encabezado from "../components/Encabezado";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

function Layout_1({unidadesCarrito}){
    return (
        <div className="pagina">
            <Encabezado
            titulo="Bienvenido a gas El Volcan"
            subtitulo="Calor y confianza para tu hogar"
            unidadesCarrito={unidadesCarrito}
            />
            <Navbar unidadesCarrito={unidadesCarrito} />
            <main>
                <Outlet />
            </main>
            <Footer />

        </div>
    );
}
export default Layout_1;


