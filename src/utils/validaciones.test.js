
import { describe, it, expect } from "vitest";
import { validarTexto, validarCorreo } from "./validaciones";

describe("Validaciones del formulario", () => {
  it("acepta nombres con 3 caracteres", () => {
    expect(validarTexto("Juan", 3)).toBe(true);
  });

  it("rechaza nombres demasiado cortos", () => {
    expect(validarTexto("Jo", 3)).toBe(false);
  });

  it("acepta un correo básico", () => {
    expect(validarCorreo("juan@gmail.com")).toBe(true);
  });

  it("rechaza un correo sin arroba", () => {
    expect(validarCorreo("juangmail.com")).toBe(false);
  });

  it("rechaza un correo sin punto", () => {
    expect(validarCorreo("juan@gmailcom")).toBe(false);
  });
});
