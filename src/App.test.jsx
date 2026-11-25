import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";

vi.mock("./services/api", () => ({
  productosApi: { obtenerProductos: vi.fn().mockResolvedValue([]) },
  pedidosApi: { crear: vi.fn() },
  authApi: { login: vi.fn(), me: vi.fn() },
}));

afterEach(() => {
  cleanup();
});

describe("Navegacion", () => {
  it("muestra los enlaces del menu principal", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(await screen.findByRole("link", { name: "Inicio" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cilindros" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Carrito (0)" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ingresar" })).toBeInTheDocument();
  });
});