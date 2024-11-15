import { isNil } from './isNil';
import { describe, it, expect } from 'vitest';

describe('fn: isNil', () => {
  it('returns true if value is undefined', () => {
    expect(isNil(undefined)).toBe(true);
  });

  it('returns true if value is null', () => {
    expect(isNil(null)).toBe(true);
  });

  it('returns false if value is not null or undefined', () => {
    expect(isNil('')).toBe(false);
    expect(isNil(0)).toBe(false);
    expect(isNil(false)).toBe(false);
  });
});
