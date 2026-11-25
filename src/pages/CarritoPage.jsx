import Carrito from '../components/Carrito'

function CarritoPage({ carrito, total, onEliminar, onCambiarCantidad, onConfirmar }) {
  return (
    <section className='pagina-carrito'>
      <h1 style={{ color: "black" }}>Mi carrito de compras</h1>

      <Carrito
        carrito={carrito}
        total={total}
        onEliminar={onEliminar}
        onCambiarCantidad={onCambiarCantidad}
        onConfirmar={onConfirmar}
      />
    </section>
  )
}

export default CarritoPage