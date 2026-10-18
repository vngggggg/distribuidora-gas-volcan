

function Producto({producto, onAgregar, etiqueta}) {
    return(
        <article className="producto col-12 col-md-6 col-lg-4">
            <img src={producto.imagen} alt={producto.nombre}/>
            <span>{etiqueta}</span>
            <h3>{producto.nombre}</h3>
            <p>Precio Residencial: ${producto.precioResidencial.toLocaleString("es-CL")}</p>
            <p>Precio Comercial: ${producto.precioComercial.toLocaleString("es-CL")}</p>
            
            <button onClick={() => onAgregar(producto)}>
                Agregar al Carrito
            </button>

        </article>
    )
}
export default Producto