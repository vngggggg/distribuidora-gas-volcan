
import './App.css'
import Encabezado from "./components/Encabezado";
import ListaProductos from './components/ListaProductos';
import Carrito from './components/Carrito';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import CarritoPage from './pages/CarritoPage';

const productos = [{
    id: 1,
    nombre:  "cilindro de 5 kg",
    precio:8000,
    peso: 5,
    etiqueta: "Mas Economico",
    categoria: "Gas licuado",
    imagen: "/images/productos/cilindro 5kg.jpg"
    
},{
  id: 2,
  nombre: "cilindro de 11 kg",
  precio: 15000,
  peso: 11,
  etiqueta: "Mas elegido",
  categoria: "Gas licuado",
  imagen: "/images/productos/cilindro 11kg.jpg"
},{
  id: 3,
  nombre: "cilindro de 15 kg",
  precio: 22000,
  peso: 15,
  etiqueta: "Mayor capacidad",
  categoria: "Gas licuado",
  imagen: "/images/productos/cilindro 15kg.png"
}]
function InicioPage() {
  return <h1>Inicio de Gas El Volcan</h1>
}
function App() {
  const [busqueda, setBusqueda] = useState("")

  const [carrito, setcarrito] = useState([])
  
  const agregarAlCarrito = (producto) => {
    setcarrito((actual) => {
      const existe = actual.find(
        (item) => item.id === producto.id
      )
      if (existe) {
        return actual.map((item) =>
        item.id === producto.id
      ? {...item, cantidad: item.cantidad +1}
        : item
      )
      }
      return [...actual, {...producto, cantidad: 1}]
    })
  }
  const eliminarDelcarrito = (idEliminar) => {
    setcarrito((actual) => actual.filter((producto) => producto.id !== idEliminar)
  )
}
 
  const total = carrito.reduce(
    (suma, producto) => suma +  producto.precio * producto.cantidad,0)
  
  const unidadesCarrito = carrito.reduce(
    (suma, producto) => suma + producto.cantidad, 0
  )
    
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()))
  
  return (
    <div className="pagina">

      <Encabezado 
      titulo="Bienvenido a Gas El Volcan"
      subtitulo="Calor y confianza para tu hogar"
      unidadesCarrito={unidadesCarrito}
      />
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
          <div className="buscador">
              <input
              type="text"
              placeholder='Buscar Cilindro...'
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              />
          </div>
          <div className="titulo-seccion">
            <span>NUESTROS PRODUCTOS</span>
            <h2 className="titulo-cilindro">Elige tu cilindro</h2>
            <p>Encuentra el tamaño que necesitas para tu hogar.</p>
          </div>

          <ListaProductos
          productos={productosFiltrados}
          onAgregar={agregarAlCarrito}
          />
          </section>

       
      <Carrito
      carrito={carrito}
      total={total}
      onEliminar={eliminarDelcarrito}
      />
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
