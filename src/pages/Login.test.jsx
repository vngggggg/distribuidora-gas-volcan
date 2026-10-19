
import { test, expect } from "vitest";
import { render, screen, fireEvent,cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

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
