import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Rutaprotegida({ children, roles }) {
  const { autenticado, role, verificando } = useAuth();
  const location = useLocation();

  if (verificando) return <p>Verificando sesión...</p>;

  if (!autenticado) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (roles && !roles.includes(role)) {
    return <Navigate to="/sin-permiso" replace />;
  }
  return children;
}

export default Rutaprotegida;