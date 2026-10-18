
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Carrito from './Carrito';

afterEach(() => {
  cleanup();
});

const carrito = [
  {
    id: 1,
    nombre: 'Gas 15 kg',
    precio: 25000,
    cantidad: 2
  }
];

describe('Componente Carrito', () => {

  it('muestra los productos agregados', () => {
    render(
      <Carrito carrito={carrito} total={50000}
        onEliminar={() => {}}
        onCambiarCantidad={() => {}} />
    );

    expect(screen.getByText('Gas 15 kg')).toBeInTheDocument();
    expect(screen.getByText(/Unidades en el Carrito: 2/))
      .toBeInTheDocument();
  });

  it('muestra el total de la compra', () => {
    render(
      <Carrito carrito={carrito} total={50000}
        onEliminar={() => {}}
        onCambiarCantidad={() => {}} />
    );

    expect(screen.getByText(/Total de la compra: \$50\.000/))
      .toBeInTheDocument();
  });

  it('permite eliminar un producto', () => {
    const eliminar = vi.fn();

    render(
      <Carrito carrito={carrito} total={50000}
        onEliminar={eliminar}
        onCambiarCantidad={() => {}} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));

    expect(eliminar).toHaveBeenCalledWith(1);
  });

  it('permite aumentar la cantidad', () => {
    const cambiarCantidad = vi.fn();

    render(
      <Carrito carrito={carrito} total={50000}
        onEliminar={() => {}}
        onCambiarCantidad={cambiarCantidad} />
    );

    fireEvent.click(screen.getByRole('button', { name: '+' }));

    expect(cambiarCantidad).toHaveBeenCalledWith(1, 3);
  });

});
