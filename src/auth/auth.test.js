
import { describe, it, expect, beforeEach } from "vitest";
import {
  iniciarSesion,
  estaAutenticado,
  cerrarSesion
} from "./auth";

describe("Inicio de sesión", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("permite ingresar al administrador", () => {
    expect(iniciarSesion("admin", "admin123")).toBe(true);
  });

  it("rechaza una contraseña incorrecta", () => {
    expect(iniciarSesion("admin", "123")).toBe(false);
  });

  it("comprueba que existe una sesión", () => {
    iniciarSesion("admin", "admin123");
    expect(estaAutenticado()).toBe(true);
  });

  it("permite cerrar sesión", () => {
    iniciarSesion("admin", "admin123");
    cerrarSesion();
    expect(estaAutenticado()).toBe(false);
  });
});
