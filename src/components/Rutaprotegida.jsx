import { Navigate, replace } from "react-router-dom";
import { estaAutenticado } from "../auth/auth";

function Rutaprotegida({ children }){
    if(!estaAutenticado()){
        return <Navigate to="/login" replace />
    }
    return children;
}
export default Rutaprotegida;