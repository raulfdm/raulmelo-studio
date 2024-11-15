export function isPlainObject(
  value: unknown,
): value is Record<PropertyKey, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  /**
   * prototype is null when the object is created with Object.create(null).
   *
   * prototype will be Object.prototype for objects created with object literals,
   * created with Object.create({}), or created with new Object(). All other types
   * (e.g. functions, arrays, regexes) will have a prototype of their respective.
   */
  return proto === null || proto === Object.prototype;
}
