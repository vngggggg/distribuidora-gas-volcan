
import './App.css'
import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import productosDatos from './data/productos';
import CarritoPage from './pages/CarritoPage';
import Contacto from './pages/Contacto';
import Rutaprotegida from './components/Rutaprotegida';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Layout_1 from './layouts/Layout_1';



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
const cambiarCantidad = (id, nuevaCantidad) => {
  if (nuevaCantidad < 1) {
    return
  }
  setcarrito((actual) =>
  actual.map((producto) =>
    producto.id === id
      ? { ...producto, cantidad: nuevaCantidad}
      : producto
  
  ))
}
 
  const total = carrito.reduce(
    (suma, producto) => suma +  producto.precio * producto.cantidad,0)
  
  const unidadesCarrito = carrito.reduce(
    (suma, producto) => suma + producto.cantidad, 0
  )
  const productos = productosDatos.map((producto) =>({
    ...producto,
    precio: producto.precioResidencial,
    etiqueta: producto.codigo,
    peso: producto.nombre,
  }));
    
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()))

  
  

  return (
    <Routes>
      <Route
      element={
        <Layout_1 unidadesCarrito={unidadesCarrito} />
      }
      >
        <Route path='/' element={<Inicio />} />

        <Route 
        path='/productos'
        element={
          <Productos
          productos={productosFiltrados}
          onAgregar={agregarAlCarrito}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          />
        }
        />
        <Route
        path='/carrito'
        element={
          <CarritoPage
          carrito={carrito}
          total={total}
          onEliminar={eliminarDelcarrito}
          onCambiarCantidad={cambiarCantidad}
          />
        }
        />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/login' element={<Login />} />

        <Route
        path='/admin'
        element={
          <Rutaprotegida>
            <Admin />
          </Rutaprotegida>
        }
        />
        <Route
        path='*'
        element={
          <section className='pagina-error'>
            <h2>¡Ups! Página no encontrada</h2>
            <p>Lo sentimos, no encontramos la pagina</p>
            <Link to="/">Volver al Inicio</Link>
          </section>
        }
        />
        </Route>
    </Routes>
    
    
    );
  }

export default App;
