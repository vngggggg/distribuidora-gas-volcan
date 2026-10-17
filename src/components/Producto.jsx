

function Producto({producto, onAgregar, etiqueta}) {
    return(
        <article className="producto">
            <img src={producto.imagen} alt={producto.nombre}/>
            <span>{etiqueta}</span>
            <h3>{producto.nombre}</h3>
            <p>${producto.precio.toLocaleString("es-CL")}</p>
            <button onClick={() => onAgregar(producto)}>
                Agregar al Carrito
            </button>

        </article>
    )
}
export default Producto