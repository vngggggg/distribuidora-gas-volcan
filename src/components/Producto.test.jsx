import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Producto from "./Producto";
import { afterEach } from "vitest";
afterEach(() => {
    cleanup();
});


const producto = {
    id: 1,
    nombre: 'Gas 15 kg',
    precioResidencial: 25000,
    precioComercial: 23000,
    imagen: '/gas15.png'
};

describe('Componente Producto', () => {
    it('muestra el nombre y los precios', () => {
        render(
            <Producto
            producto={producto}
            onAgregar={() => {}}
            etiqueta="disponible"
            />

        )

        expect(screen.getByText('Gas 15 kg')).toBeInTheDocument();
        expect(screen.getByText(/25\.000/)).toBeInTheDocument();
        expect(screen.getByText(/23\.000/)).toBeInTheDocument();
    });
    it("permite agregar un producto al carrito", () => {
        const agregar = vi.fn();
        render(
            <Producto
            producto={producto}
            onAgregar={agregar}
            etiqueta="disponible"
            />
        );

        fireEvent.click(
            screen.getByRole('button',{name: /agregar al carrito/i})
        );
        expect(agregar).toHaveBeenCalledWith(producto);
        expect(agregar).toHaveBeenCalledTimes(1);
    });
});
