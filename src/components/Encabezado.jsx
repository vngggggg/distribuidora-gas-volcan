
function Encabezado({ titulo, subtitulo, unidadesCarrito }) {
  return (
    <header className="encabezado">
      <div className="logo">
        <span className="logo-icono">♨️</span>
        <div>
          <h1>{titulo}</h1>
          <p>{subtitulo}</p>
        </div>
      </div>

      
      <div className="contador-carrito">
        🛒 Carrito ({unidadesCarrito})
      </div>

      <button className="boton-ingresar">
        Iniciar sesión
      </button>
    </header>
  )
}

export default Encabezado
