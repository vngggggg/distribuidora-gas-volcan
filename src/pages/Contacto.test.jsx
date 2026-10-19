
import { test, expect } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import Contacto from "./Contacto";

afterEach(() => {
    cleanup();
});

test("muestra el formulario de contacto", () => {
  render(<Contacto />);

  expect(screen.getByText("Contactanos")).toBeTruthy();
  expect(screen.getByRole("button", { name: "Enviar mensaje" })).toBeTruthy();
});

test("muestra un error cuando los datos están vacíos", () => {
  render(<Contacto />);

  fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

  expect(
    screen.getByText("vuelve a intentarlo")
  ).toBeTruthy();
});
