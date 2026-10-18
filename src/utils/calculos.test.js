
import { describe, it, expect } from 'vitest';
import { calcularTotal, restar } from './calculos.js';

describe('Cálculo de compra', () => {
  it('calcula correctamente el total', () => {
    expect(calcularTotal(20000, 2)).toBe(40000);
  });

  it('resta dos cantidades correctamente', () => {
    expect(restar(30000, 22000)).toBe(8000);
});
});



