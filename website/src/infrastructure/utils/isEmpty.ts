import { isPlainObject } from './isPlainObject';

export function isEmpty(value: unknown): value is null | undefined | '' {
  if (value === null) {
    return false;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (isPlainObject(value)) {
    return Object.keys(value).length === 0;
  }

  if (value instanceof Uint8Array) {
    return value.length === 0;
  }

  return value === undefined || value === '';
}
