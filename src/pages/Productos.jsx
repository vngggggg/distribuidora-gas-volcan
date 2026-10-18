
import ListaProductos from '../components/ListaProductos'

function Productos({ productos, onAgregar, busqueda, setBusqueda }) {
  return (
    <section className="productos" id="productos">
      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar cilindro..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="titulo-seccion">
        <span>NUESTROS PRODUCTOS</span>
        <h2 className="titulo-cilindro">Elige tu cilindro</h2>
        <p>Encuentra el tamaño que necesitas para tu hogar.</p>
      </div>

      <ListaProductos
        productos={productos}
        onAgregar={onAgregar}
      />
    </section>
  )
}

export default Productos
