
import { test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Rutaprotegida from "./Rutaprotegida";

beforeEach(() => {
  localStorage.clear();
});

test("impide entrar al administrador sin sesión", () => {
  render(
    <MemoryRouter initialEntries={["/admin"]}>
      <Routes>
        <Route path="/login" element={<h2>Iniciar sesión</h2>} />
        <Route
          path="/admin"
          element={
            <Rutaprotegida>
              <h2>Administrador</h2>
            </Rutaprotegida>
          }
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText("Iniciar sesión")).toBeTruthy();
});

test("permite entrar al administrador con sesión", () => {
  localStorage.setItem("usuarioActual", "admin");

  render(
    <MemoryRouter initialEntries={["/admin"]}>
      <Routes>
        <Route
          path="/admin"
          element={
            <Rutaprotegida>
              <h2>Administrador</h2>
            </Rutaprotegida>
          }
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText("Administrador")).toBeTruthy();
});
