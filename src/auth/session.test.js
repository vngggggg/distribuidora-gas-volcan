import { describe, it, expect, beforeEach } from "vitest";
import { isExpired, saveSession, readSession, clearSession } from "./session";

const crearToken = (exp) => `a.${btoa(JSON.stringify({ exp }))}.c`;
const ahora = () => Math.floor(Date.now() / 1000);

describe("Sesión JWT", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("detecta un token vencido", () => {
    expect(isExpired(crearToken(ahora() - 10))).toBe(true);
  });

  it("acepta un token vigente", () => {
    expect(isExpired(crearToken(ahora() + 3600))).toBe(false);
  });

  it("no guarda un token vencido", () => {
    const guardada = saveSession({ token: crearToken(ahora() - 10), username: "admin", role: "ADMIN" });
    expect(guardada).toBe(false);
    expect(readSession()).toBeNull();
  });

  it("guarda y recupera una sesión vigente", () => {
    saveSession({ token: crearToken(ahora() + 3600), username: "admin", role: "ADMIN" });
    expect(readSession().role).toBe("ADMIN");
  });

  it("cierra la sesión", () => {
    saveSession({ token: crearToken(ahora() + 3600), username: "admin", role: "ADMIN" });
    clearSession();
    expect(readSession()).toBeNull();
  });
});