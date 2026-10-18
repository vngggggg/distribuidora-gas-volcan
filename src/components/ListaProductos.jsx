import Producto from "./Producto";



function ListaProductos({productos, onAgregar}){
    return(
    <div className="row g-4">
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