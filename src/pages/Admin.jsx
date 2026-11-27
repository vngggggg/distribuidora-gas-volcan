import { useEffect, useState } from "react";
import { productosApi } from "../services/api";

const VACIO = {
  codigo: "",
  categoria: "Cilindros de Gas",
  nombre: "",
  descripcion: "",
  unidad: "Unidad",
  precioResidencial: "",
  precioComercial: "",
  stock: "",
  imagen: "",
};

function Admin() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  async function cargar() {
    try {
      setProductos(await productosApi.listar());
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function limpiar() {
    setForm(VACIO);
    setEditandoId(null);
  }

  async function guardar(e) {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (!form.codigo.trim() || !form.nombre.trim()) {
      setError("El código y el nombre son obligatorios.");
      return;
    }
    const precioResidencial = Number(form.precioResidencial);
    const precioComercial = Number(form.precioComercial);
    const stock = Number(form.stock);
    if ([precioResidencial, precioComercial, stock].some((n) => !Number.isFinite(n) || n < 0)) {
      setError("Los precios y el stock deben ser números mayores o iguales a 0.");
      return;
    }

    const datos = { ...form, precioResidencial, precioComercial, stock };
    try {
      if (editandoId) {
        await productosApi.actualizar(editandoId, datos);
        setMensaje("Producto actualizado.");
      } else {
        await productosApi.crear(datos);
        setMensaje("Producto creado.");
      }
      limpiar();
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  }

  function editar(producto) {
    setEditandoId(producto.id);
    setForm({
      codigo: producto.codigo ?? "",
      categoria: producto.categoria ?? "",
      nombre: producto.nombre ?? "",
      descripcion: producto.descripcion ?? "",
      unidad: producto.unidad ?? "",
      precioResidencial: producto.precioResidencial ?? "",
      precioComercial: producto.precioComercial ?? "",
      stock: producto.stock ?? "",
      imagen: producto.imagen ?? "",
    });
    setMensaje("");
    setError("");
  }

  async function eliminar(producto) {
    if (!window.confirm(`¿Eliminar "${producto.nombre}"?`)) return;
    setMensaje("");
    setError("");
    try {
      await productosApi.eliminar(producto.id);
      setMensaje("Producto eliminado.");
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <section className="contacto">
      <h2>Panel de Administración</h2>
      <p>Gestiona el catálogo de productos de Gas El Volcán.</p>

      <form className="formulario-contacto" onSubmit={guardar}>
        <h3>{editandoId ? "Editar producto" : "Nuevo producto"}</h3>

        {[
          ["codigo", "Código"],
          ["nombre", "Nombre"],
          ["categoria", "Categoría"],
          ["descripcion", "Descripción"],
          ["unidad", "Unidad"],
          ["precioResidencial", "Precio residencial"],
          ["precioComercial", "Precio comercial"],
          ["stock", "Stock"],
          ["imagen", "Imagen (ruta)"],
        ].map(([campo, etiqueta]) => (
          <div className="campo-contacto" key={campo}>
            <label htmlFor={campo}>{etiqueta}</label>
            <input id={campo} name={campo} value={form[campo]} onChange={cambiar} />
          </div>
        ))}

        <button type="submit">{editandoId ? "Guardar cambios" : "Crear producto"}</button>
        {editandoId && (
          <button type="button" onClick={limpiar}>
            Cancelar edición
          </button>
        )}
        {mensaje && <p role="status">{mensaje}</p>}
        {error && <p role="alert">{error}</p>}
      </form>

      <h3>Productos registrados</h3>
      {cargando && <p>Cargando productos...</p>}
      {!cargando && productos.length === 0 && <p>No hay productos registrados.</p>}

      {productos.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Residencial</th>
                <th>Comercial</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td>${p.precioResidencial}</td>
                  <td>${p.precioComercial}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button type="button" onClick={() => editar(p)}>Editar</button>{" "}
                    <button type="button" onClick={() => eliminar(p)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Admin;