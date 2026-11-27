# Frontend - Distribuidora Gas el Volcan

Aplicacion React 19 + Vite que consume la API REST del backend Spring boot

Backend: https://github.com/vngggggg/distribuidora-gas_volcan-backend.git

# Requisitos
- Node.js 20 o superior
- El backend corriendo en http://localhost:8080 (ver el README del backend)

# Ejecutable
* npm install
* npm run dev

Abrir http://localhost:5173. La URL de la API se puede cambiar con la variable VITE_API_URL (por defecto http://localhost:8080).

# Pruebas y build
* npm test
* npm run build

# Usuarios de demostracion 
| Usuario | Contraseña | Rol |
------------------------------------------
| admin | Admin123! | ADMIN
| cliente | Cliente123! | CLIENTE

# Funcionalidades
- Catalogo cargado desde de la API, con estados de carga y error.
- Carrito que confirma la compra creando pedidods en el backend (valida stock)
- Login con JWT: la sesion se conserva al recargar (sessionStorage), se valida con /auth/me y se cierra al vencer ek token
- Rutas por rol: /admin solo par ADMIN, los demas ven la pantalla "sin permisos"; sin sesion se redirige al login
- Panel de admin con CRUD de productos.