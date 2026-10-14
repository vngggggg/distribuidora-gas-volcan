
import './App.css'
const productos = [{
    id: 1,
    nombre:  "cilindro de 5 kg",
    precio:8000,
    peso: 5
},{
  id: 2,
  nombre: "cilindro de 11 kg",
  precio: 15000,
  peso: 11
},{
  id: 3,
  nombre: "cilidro de 15 kg",
  precio: 22000,
  peso: 15
}]
function App() {
  return (
    <div className="pagina">

      <header className="encabezado">
        <div className="logo">
          <span className="logo-icono">♨️</span>
          <div>
            <h1>Bienvenido a Gas El Volcán</h1>

            <p>Calor y confianza para tu hogar</p>
          </div>
        </div>

        <nav className="menu">
          <a href="#inicio">Inicio</a>
          <a href="#productos">Cilindros</a>
          <a href="#nosotros">Nosotros</a>
        </nav>

        <button className="boton-ingresar">
          Iniciar sesión
        </button>
      </header>

      <main>
        <section className="portada" id="inicio">
          <div className="portada-texto">
            <span className="etiqueta">DISTRIBUIDORA EN CHILLÁN</span>

            <h2>El gas que tu hogar necesita, a un clic de distancia.</h2>

            <p>
              Compra tu cilindro de gas de forma sencilla
              y sigue el estado de tu pedido desde tu hogar.
            </p>

            <a href="#productos" className="boton-principal">
              Ver cilindros
            </a>
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

        <section className="productos" id="productos">
          <div className="titulo-seccion">
            <span>NUESTROS PRODUCTOS</span>
            <h2>Elige tu cilindro</h2>
            <p>Encuentra el tamaño que necesitas para tu hogar.</p>
          </div>

          <div className="productos-lista">
            <article className="producto">
              <div className="producto-icono">🛢️</div>
              <h3>Cilindro de 5 kg</h3>
              <p>$8.000</p>
              <button>Ver producto</button>
            </article>

            <article className="producto destacado">
              <span className="popular">Más solicitado</span>
              <div className="producto-icono">🛢️</div>
              <h3>Cilindro de 11 kg</h3>
              <p>$15.000</p>
              <button>Ver producto</button>
            </article>  

            <article className="producto">
              <div className="producto-icono">🛢️</div>
              <h3>Cilindro de 15 kg</h3>
              <p>$22.000</p>
              <button>Ver producto</button>
            </article>
          </div>
        </section>

        <section className="nosotros" id="nosotros">
          <h2>Tu distribuidora de confianza</h2>
          <p>
            Queremos que pedir gas sea más fácil y cómodo
            para las familias de Chillán.
          </p>
        </section>
      </main>

      <footer>
        <p>© 2026 Gas El Volcán · Chillán, Región de Ñuble</p>
      </footer>

    </div>
  )
}

export default App
