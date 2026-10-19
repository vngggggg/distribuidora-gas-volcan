
import { test, expect } from "vitest";
import { render, screen, fireEvent,cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

import Login from "./Login";
import { MemoryRouter,Routes, Route } from "react-router-dom";


afterEach(() => {
    cleanup();
})

test("muestra el formulario de inicio de sesión", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  expect(screen.getByText("Acceso para administradores")).toBeTruthy();
  expect(screen.getByRole("button", { name: "Ingresar" })).toBeTruthy();
});

test("muestra un error si los datos son incorrectos", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText("Usuario"), {
    target: { value: "usuario" }
  });

  fireEvent.change(screen.getByLabelText("Contraseña"), {
    target: { value: "incorrecta" }
  });

  fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

  expect(screen.getByText("Usuario o contraseña incorrectos")).toBeTruthy();
});

test("permite iniciar sesión y navegar al panel de administración", () => {
  localStorage.removeItem("usuarioActual");

  render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={<h2>Panel de Administración</h2>}
        />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText("Usuario"), {
    target: { value: "admin" },
  });

  fireEvent.change(screen.getByLabelText("Contraseña"), {
    target: { value: "admin123" },
  });

  fireEvent.click(
    screen.getByRole("button", { name: "Ingresar" })
  );

  expect(
    screen.getByRole("heading", {
      name: "Panel de Administración",
    })
  ).toBeTruthy();

  expect(localStorage.getItem("usuarioActual")).toBe("admin");

  localStorage.removeItem("usuarioActual");
});

