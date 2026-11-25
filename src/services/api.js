import { readSession, clearSession } from '../auth/session';

export const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');

async function request(ruta, opciones = {}) {
  const sesion = readSession();
  const headers = { 'Content-Type': 'application/json', ...opciones.headers };
  if (sesion?.token) headers.Authorization = `Bearer ${sesion.token}`;

  let respuesta;
  try {
    respuesta = await fetch(`${API_BASE}${ruta}`, { ...opciones, headers });
  } catch {
    throw Object.assign(
      new Error('No fue posible conectar con el servidor. Verifica que el backend esté en localhost:8080.'),
      { status: 0 }
    );
  }

  if (respuesta.status === 204) return null;

  const tipo = respuesta.headers.get('content-type') || '';
  const cuerpo = tipo.includes('application/json') ? await respuesta.json() : null;

  if (!respuesta.ok) {
    if (respuesta.status === 401) clearSession(); // Token vencido o inválido: se cierra la sesión.
    const mensaje =
      respuesta.status === 403 ? 'No tienes permisos para realizar esta acción.'
      : cuerpo?.error || cuerpo?.message || `Error HTTP ${respuesta.status}`;
    throw Object.assign(new Error(mensaje), { status: respuesta.status });
  }
  return cuerpo;
}

export const authApi = {
  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  me: () => request('/auth/me'),
};

export const productosApi = {
  listar: () => request('/api/productos'),
  buscar: (id) => request(`/api/productos/${id}`),
  crear: (producto) => request('/api/productos', { method: 'POST', body: JSON.stringify(producto) }),
  actualizar: (id, producto) =>
    request(`/api/productos/${id}`, { method: 'PUT', body: JSON.stringify(producto) }),
  eliminar: (id) => request(`/api/productos/${id}`, { method: 'DELETE' }),
  obtenerProductos: () => request('/api/productos'),
};
export const pedidosApi = {
  crear: (pedido) => request('/api/pedidos', { method: 'POST', body: JSON.stringify(pedido) }),
  mios: () => request('/api/pedidos/mios'),
  todos: () => request('/api/pedidos'),
};