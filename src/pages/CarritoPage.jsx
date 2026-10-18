
import Carrito from '../components/Carrito'

function CarritoPage({ carrito, total, onEliminar, onCambiarCantidad }) {
  return (
    <section className='pagina-carrito'>
      <h1 style={{ color: "black" }}>Mi carrito de compras</h1>

      <Carrito
        carrito={carrito}
        total={total}
        onEliminar={onEliminar}
        onCambiarCantidad={onCambiarCantidad}
      />
    </section>
  )
}

export default CarritoPage
