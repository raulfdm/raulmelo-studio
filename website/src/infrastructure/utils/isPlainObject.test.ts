import { describe, it, expect } from 'vitest';
import { isPlainObject } from './isPlainObject';

describe('isPlainObject', () => {
  // Plain objects
  it('should return true for empty objects', () => {
    expect(isPlainObject({})).toBe(true);
  });

  it('should return true for objects with properties', () => {
    expect(isPlainObject({ foo: 'bar', baz: 123 })).toBe(true);
  });

  it('should return true for Object.create(null)', () => {
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  // Non-plain objects
  it('should return false for arrays', () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject([1, 2, 3])).toBe(false);
  });

  it('should return false for Date objects', () => {
    expect(isPlainObject(new Date())).toBe(false);
  });

  it('should return false for Error objects', () => {
    expect(isPlainObject(new Error())).toBe(false);
  });

  it('should return false for functions', () => {
    expect(isPlainObject(() => {})).toBe(false);
    expect(isPlainObject(function () {})).toBe(false);
    expect(isPlainObject(Math.max)).toBe(false);
  });

  it('should return false for class instances', () => {
    class TestClass {}
    expect(isPlainObject(new TestClass())).toBe(false);
  });

  // Primitives
  it('should return false for null', () => {
    expect(isPlainObject(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isPlainObject(undefined)).toBe(false);
  });

  it('should return false for primitive values', () => {
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject('string')).toBe(false);
    expect(isPlainObject(true)).toBe(false);
    expect(isPlainObject(Symbol())).toBe(false);
    expect(isPlainObject(BigInt(42))).toBe(false);
  });

  // Edge cases
  it('should return false for objects with custom prototype chain', () => {
    const proto = { foo: 'bar' };
    expect(isPlainObject(Object.create(proto))).toBe(false);
  });

  it('should return false for built-in objects', () => {
    expect(isPlainObject(new Map())).toBe(false);
    expect(isPlainObject(new Set())).toBe(false);
    expect(isPlainObject(new WeakMap())).toBe(false);
    expect(isPlainObject(new WeakSet())).toBe(false);
    expect(isPlainObject(new Promise(() => {}))).toBe(false);
    expect(isPlainObject(new Int32Array())).toBe(false);
  });

  it('should properly narrow types when used in type guard', () => {
    const value: unknown = { foo: 'bar' };

    if (isPlainObject(value)) {
      // Test that we can access known properties
      expect(value.foo).toBe('bar');

      // Test that unknown properties are undefined
      expect(value.nonexistentProperty).toBeUndefined();

      // Test that we can use object methods
      expect(Object.keys(value)).toContain('foo');
    } else {
      // This should not execute
      expect.fail('Should identify plain object correctly');
    }
  });
});
