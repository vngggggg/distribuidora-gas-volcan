import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Link, MemoryRouter } from "react-router-dom";
import App from "./App";

describe('Navegacion',() => {
    it("muestra los enlaces del menu principal", () =>{
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByRole('link', { name: 'Inicio' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Cilindros' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Carrito (0)' })).toBeInTheDocument();

    });
});