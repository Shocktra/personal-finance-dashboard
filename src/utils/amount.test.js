import { describe, expect, it } from 'vitest';
import { parseAmount } from './amount';

describe('parseAmount', () => {
  it.each([
    ['25000', 25000],
    ['-1200', -1200],
    ['-1200.50', -1200.5],
    ['-1.200,50', -1200.5],
    ['1.200,50', 1200.5],
    ['1,200.50', 1200.5],
    ['12,5', 12.5],
    ['1.200.000', 1200000],
    ['1,200,000', 1200000],
    ['+3000', 3000],
    ['-450 TL', -450],
    ['₺-1.250,75', -1250.75],
    [' 150 ', 150],
  ])('%s -> %d', (input, expected) => {
    expect(parseAmount(input)).toBe(expected);
  });

  it.each(['', 'abc', null, undefined, '--', '.'])('returns NaN for %p', (input) => {
    expect(parseAmount(input)).toBeNaN();
  });

  it('passes numbers through', () => {
    expect(parseAmount(-12.5)).toBe(-12.5);
  });
});
