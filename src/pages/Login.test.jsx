import { test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { AuthProvider } from "../auth/AuthContext";
import { authApi } from "../services/api";

vi.mock("../services/api", () => ({
  authApi: { login: vi.fn(), me: vi.fn() },
}));

function tokenVigente() {
  const exp = Math.floor(Date.now() / 1000) + 3600;
  return `a.${btoa(JSON.stringify({ exp }))}.c`;
}

function mostrarLogin() {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<h2>Panel de Administración</h2>} />
          <Route path="/productos" element={<h2>Catálogo</h2>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}

function escribirYEnviar(usuario, clave) {
  fireEvent.change(screen.getByLabelText("Usuario"), { target: { value: usuario } });
  fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: clave } });
  fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));
}

beforeEach(() => {
  sessionStorage.clear();
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test("muestra el formulario de inicio de sesión", () => {
  mostrarLogin();
  expect(screen.getByText("Iniciar sesión")).toBeTruthy();
  expect(screen.getByRole("button", { name: "Ingresar" })).toBeTruthy();
});

test("muestra un error si las credenciales son incorrectas", async () => {
  authApi.login.mockRejectedValue(Object.assign(new Error("Credenciales incorrectas"), { status: 401 }));
  mostrarLogin();
  escribirYEnviar("usuario", "incorrecta");
  expect(await screen.findByText("Usuario o contraseña incorrectos")).toBeTruthy();
});

test("el administrador inicia sesión y llega al panel", async () => {
  authApi.login.mockResolvedValue({ token: tokenVigente(), rol: "ADMIN", tipo: "Bearer" });
  mostrarLogin();
  escribirYEnviar("admin", "Admin123!");
  expect(await screen.findByRole("heading", { name: "Panel de Administración" })).toBeTruthy();
  expect(sessionStorage.getItem("gasvolcan.session")).not.toBeNull();
});

test("el cliente inicia sesión y llega al catálogo", async () => {
  authApi.login.mockResolvedValue({ token: tokenVigente(), rol: "CLIENTE", tipo: "Bearer" });
  mostrarLogin();
  escribirYEnviar("cliente", "Cliente123!");
  expect(await screen.findByRole("heading", { name: "Catálogo" })).toBeTruthy();
});