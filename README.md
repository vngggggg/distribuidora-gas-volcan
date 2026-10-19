
# Distribuidora de Gas El Volcán

## Descripción del proyecto

Aplicación web desarrollada para la Distribuidora de Gas El Volcán, ubicada en Chillán, Chile.

El sistema permite visualizar productos, buscar cilindros de gas, gestionar un carrito de compras y utilizar un formulario de contacto.

También incluye autenticación simulada y una página de administración protegida.

Proyecto académico de la asignatura DSY1104 - Desarrollo Full Stack II, Evaluación Parcial 2.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- React Router
- Bootstrap
- Vitest
- React Testing Library
- LocalStorage

## Requisitos

Tener instalados Node.js y npm.

## Instalación y ejecución

1. Clonar o descargar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Abrir una terminal en la carpeta del proyecto.
4. Instalar las dependencias:

    npm install

5. Iniciar el servidor de desarrollo:

    npm run dev

6. Abrir en el navegador la dirección local indicada por Vite.

## Funcionalidades principales

- Página de inicio.
- Catálogo de cilindros de gas.
- Búsqueda de productos.
- Agregar productos al carrito.
- Modificar cantidades y eliminar productos.
- Cálculo del total del carrito.
- Formulario de contacto con validaciones.
- Inicio y cierre de sesión.
- Panel de administración con ruta protegida.

## Acceso de demostración

Usuario: admin

Contraseña: admin123

La autenticación es simulada mediante LocalStorage y se utiliza únicamente con fines académicos.

## Pruebas automatizadas

El proyecto utiliza Vitest y React Testing Library.

Ejecutar todas las pruebas:

    npm run test

Generar el reporte de cobertura:

    npm run test:coverage

Último resultado verificado:
- 28 pruebas aprobadas.
- 10 archivos de pruebas.
- Cobertura de sentencias: 61,85 %.
- Cobertura de ramas: 50 %.
- Cobertura de funciones: 54,54 %.
- Cobertura de líneas: 62,76 %.

## Compilación de producción

Ejecutar:

    npm run build

## Repositorio GitHub

https://github.com/vngggggg/distribuidora-gas-volcan

## Información académica

Asignatura: DSY1104 - Desarrollo Full Stack II

Evaluación: Evaluación Parcial 2 (EP2)

Año: 2026
