import { Link } from "react-router-dom";

function SinPermiso() {
  return (
    <section className="pagina-error">
      <h2>Sin permisos</h2>
      <p>Tu cuenta no tiene acceso a esta sección.</p>
      <Link to="/">Volver al Inicio</Link>
    </section>
  );
}

export default SinPermiso;