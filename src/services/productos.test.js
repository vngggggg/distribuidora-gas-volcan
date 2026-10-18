import { describe, it, expect, vi } from "vitest";
import { cargarProductos } from "./productosServices";

describe('Servicio de productos', () => {
    it('obtiene los cilindros correctamente', async () =>{
        const productos = [
            {id: 1, nombre: 'Gas 15 kg'}
        ];
        const cliente = {
            obtenerProductos: vi.fn().mockResolvedValue(productos)
        };
        const resultado = await cargarProductos(cliente);
        expect(resultado).toEqual(productos);
        expect(cliente.obtenerProductos).toHaveBeenCalledTimes(1);
    });

    it('perite obtener una lista vacia', async () => {
        const cliente = {
            obtenerProductos: vi.fn().mockResolvedValue([])
        };

        const resultado = await cargarProductos(cliente);
        expect(resultado).toEqual([]);
    });
    it('detecta errores de conexion',async () => {
        const cliente = {
            obtenerProductos: vi.fn()
            .mockRejectedValue(new Error(' sin conexion'))
        };
        await expect(cargarProductos(cliente))
        .rejects.toThrow(' sin conexion')
    });
})