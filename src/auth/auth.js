
export function iniciarSesion(usuario, password) {
  if (usuario === "admin" && password === "admin123") {
    localStorage.setItem("usuarioActual", usuario);
    return true;
  }

  return false;
}

export function estaAutenticado() {
  return localStorage.getItem("usuarioActual") !== null;
}

export function cerrarSesion() {
  localStorage.removeItem("usuarioActual");
}
