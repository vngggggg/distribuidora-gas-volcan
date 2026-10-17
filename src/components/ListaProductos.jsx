import Producto from "./Producto";



function ListaProductos({productos, onAgregar}){
    return(
    <div className="productos-lista">
        {productos.map((producto) => (
            <Producto
            key={producto.id}
            producto={producto}
            etiqueta={producto.etiqueta}
            onAgregar={onAgregar}
            />
        ))}

    </div>
)
}
export default ListaProductos;