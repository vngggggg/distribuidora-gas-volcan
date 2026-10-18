
import { useState } from "react"
import { restar } from "../utils/calculos"

function Carrito({carrito, total, onEliminar, onCambiarCantidad}) {
    const [dinero, setDinero] = useState('');
    const restante = restar(Number(dinero),total)
    return(
        <section
        className="carrito" id="carrito">
            <h2 style={{color: "black"}}>Mi Carrito 🛒</h2>
            <p>
                Unidades en el Carrito: {
                    carrito.reduce((suma, producto) => suma + producto.cantidad, 0)
                }
            </p>
           {carrito.map((producto, indice) => (

            <div key={producto.id}>
                <p>{producto.nombre}</p>
                <div className="control-cantidad">
                <button onClick={() => onCambiarCantidad(producto.id, producto.cantidad - 1)}>
                 −
                </button>
                <span>{producto.cantidad}</span>
                <button onClick={() => onCambiarCantidad(producto.id, producto.cantidad + 1)}>
                +
                </button>
                </div>
                <p>${producto.precio.toLocaleString("es-CL")}</p>
                <button onClick={() => onEliminar(producto.id)}>
                    Eliminar
                </button>
            </div>
        ))}
        <p>
            Total de la compra: ${total.toLocaleString("es-CL")}
        </p>
        <div className="calculo-dinero">
            <h3>Calcula tu dinero restante</h3>
            <input
            type="number"
            placeholder="¿Cuanto dinero tienes?"
            value={dinero}
            min="0"
            onChange={(e) => setDinero(e.target.value)}
            />
            {dinero !== '' &&(
                <p>
                {restante >= 0
                ? `Te quedan $${restante.toLocaleString("es-CL")}`
                : `Te faltan $${Math.abs(restante).toLocaleString("es-CL")}`
                }
                </p>
            )}
        </div>
        </section>
    )
}
export default Carrito