
import { describe, it, expect } from 'vitest';
import { calcularTotal } from './calculos.js';

describe('Cálculo de compra', () => {
  it('calcula correctamente el total', () => {
    expect(calcularTotal(20000, 2)).toBe(40000);
  });
});

