import { isPlainObject } from './isPlainObject';

export function isEmpty(
  value: unknown,
): value is null | undefined | '' | never[] | Record<string, never> {
  if (value === null) {
    return false;
  }

  if (typeof value === 'string') {
    return value.length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (isPlainObject(value)) {
    return Object.keys(value).length === 0;
  }

  if (ArrayBuffer.isView(value) || value instanceof ArrayBuffer) {
    return value.byteLength === 0;
  }

  if (value === undefined) {
    return true;
  }

  return false;
}
