
import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <>
    <section
    className="portada" id="inicio">
        <div className="portada-texto">
            <span className="etiqueta">
                DISTRIBUIDORA EN CHILLAN
            </span>

            <h2>
                El gas que tu hogar necesita, a un clic de distancia
            </h2>

            <p>
               Compra tu cilindro de gas de forma sencilla
            y sigue el estado de tu pedido desde tu hogar.
            </p>
            <Link to="/productos" className='boton-principal'>
            Ver Cilindros
            </Link>

           
        </div>
        <div className="portada-visual">
  <div className="circulo">
    <span>♨️</span>
  </div>

  <div className="mensaje-entrega">
    ✓ Entregas en Chillán
  </div>
</div>    
    </section>
    <section className="nosotros" id="nosotros">
        <h2>Tu distribuidora de confianza</h2>
        <p>Queremos que pedir gas sea mas facil y comodo para las familias de chillan</p>

    </section>
    </>
    
  )
}

export default Inicio
