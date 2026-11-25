import { test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Rutaprotegida from "./Rutaprotegida";
import { AuthProvider } from "../auth/AuthContext";
import { authApi } from "../services/api";

vi.mock("../services/api", () => ({
  authApi: { login: vi.fn(), me: vi.fn() },
}));

function tokenVigente() {
  const exp = Math.floor(Date.now() / 1000) + 3600;
  return `a.${btoa(JSON.stringify({ exp }))}.c`;
}

function guardarSesion(role) {
  sessionStorage.setItem(
    "gasvolcan.session",
    JSON.stringify({ token: tokenVigente(), username: "usuario", role })
  );
  authApi.me.mockResolvedValue({ username: "usuario", rol: role });
}

function mostrarAdmin(roles) {
  render(
    <MemoryRouter initialEntries={["/admin"]}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<h2>Iniciar sesión</h2>} />
          <Route path="/sin-permiso" element={<h2>Sin permisos</h2>} />
          <Route
            path="/admin"
            element={
              <Rutaprotegida roles={roles}>
                <h2>Administrador</h2>
              </Rutaprotegida>
            }
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  sessionStorage.clear();
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test("impide entrar al administrador sin sesión", async () => {
  mostrarAdmin(["ADMIN"]);
  expect(await screen.findByText("Iniciar sesión")).toBeTruthy();
});

test("permite entrar al rol ADMIN", async () => {
  guardarSesion("ADMIN");
  mostrarAdmin(["ADMIN"]);
  expect(await screen.findByText("Administrador")).toBeTruthy();
});

test("bloquea al rol CLIENTE en una ruta de administrador", async () => {
  guardarSesion("CLIENTE");
  mostrarAdmin(["ADMIN"]);
  expect(await screen.findByText("Sin permisos")).toBeTruthy();
});