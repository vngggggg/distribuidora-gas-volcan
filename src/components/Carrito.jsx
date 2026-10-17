


function Carrito({carrito, total, onEliminar}) {
    return(
        <section
        className="carrito" id="carrito">
            <h2>Mi Carrito 🛒</h2>
            <p>
                Unidades en el Carrito: {
                    carrito.reduce((suma, producto) => suma + producto.cantidad, 0)
                }
            </p>
           {carrito.map((producto, indice) => (

            <div key={producto.id}>
                <p>{producto.nombre}</p>
                <p>Cantidad: {producto.cantidad}</p>
                <p>${producto.precio.toLocaleString("es-CL")}</p>
                <button onClick={() => onEliminar(producto.id)}>
                    Eliminar
                </button>
            </div>
        ))}
        <p>
            Total de la compra: ${total.toLocaleString("es-CL")}
        </p>
        </section>
    )
}
export default Carrito