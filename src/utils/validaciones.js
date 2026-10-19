

export function validarTexto(texto, minimo = 3) {
    return texto.trim().length >= minimo;
}

export function validarCorreo(correo) {
    return correo.includes('@') && correo.includes(".");
}