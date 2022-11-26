import { getPathnameWithoutLocale, getPathnameWithLocale } from '../url';

describe('pathWithoutLocale', () => {
  it('should return the path without the locale', () => {
    expect(getPathnameWithoutLocale('/en/path/to/something')).toBe(
      '/path/to/something',
    );
  });

  it('should return the path without the locale [2]', () => {
    expect(getPathnameWithoutLocale('/pt/another-path')).toBe('/another-path');
  });

  it('should return the same path if it does not contain locale', () => {
    expect(getPathnameWithoutLocale('/another-path')).toBe('/another-path');
  });

  it('should return the path without the locale. Edge case "/"', () => {
    expect(getPathnameWithoutLocale('/en')).toBe('/');
  });
});

describe('getPathnameWithLocale', () => {
  it('returns the path with locale', () => {
    expect(getPathnameWithLocale('/path/to/something', 'en')).toBe(
      '/en/path/to/something',
    );
  });

  it('returns the path with locale [2]', () => {
    expect(getPathnameWithLocale('/path/to/something', 'pt')).toBe(
      '/pt/path/to/something',
    );
  });

  it('returns the same pathname if it already contains a locale', () => {
    expect(getPathnameWithLocale('/pt/path/to/something', 'pt')).toBe(
      '/pt/path/to/something',
    );
  });
});
