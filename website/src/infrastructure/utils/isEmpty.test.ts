import { describe, it, expect } from 'vitest';

import { isEmpty } from './isEmpty';

describe('fn: isEmpty', () => {
  it('should return true for empty values', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(Uint8Array.from([]))).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
  });

  it('should return false for non-empty values', () => {
    expect(isEmpty(null)).toBe(false);
    expect(isEmpty({ length: 0 })).toBe(false);
    expect(isEmpty('a')).toBe(false);
    expect(isEmpty(1)).toBe(false);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty(Uint8Array.from([1]))).toBe(false);
    expect(isEmpty(new Map([['a', 1]]))).toBe(false);
    expect(isEmpty(new Set([1]))).toBe(false);
  });
});
