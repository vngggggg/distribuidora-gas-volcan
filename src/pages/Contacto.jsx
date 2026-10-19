import { useState } from "react";
import { validarCorreo, validarTexto } from "../utils/validaciones";
function Contacto() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [resultado, setResultado] = useState("");

    function enviar(e){
        e.preventDefault()
        if (
            validarTexto(nombre, 3) &&
            validarCorreo(correo) &&
            validarTexto(mensaje, 5)
        ){
            localStorage.setItem("ultimoContacto", JSON.stringify({
                nombre,
                correo,
                mensaje
            }));
            setResultado("datos guardados");
            setNombre("");
            setCorreo("");
            setMensaje("");
            
    } else {
        setResultado("vuelve a intentarlo")
    }
}

    return (
        <section className="contacto">
            <h2>Contactanos</h2>
            <p>¿Tienes alguna consulta? Escribenos.</p>
            <form className="formulario-contacto" onSubmit={enviar}>
                
                <div className="campo-contacto">
                    <label>Nombre</label>
                    <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo-contacto">
                    <label>
                        Correo electronico
                    </label>
                    <input type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)} />
                </div>
                <div className="campo-contacto">
                    <label>Mensaje</label>
                    <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    />
                </div>
                <button type="submit">
                    Enviar mensaje
                </button>
            </form>
            <p>{resultado}</p>
        </section>
    );
}
export default Contacto;