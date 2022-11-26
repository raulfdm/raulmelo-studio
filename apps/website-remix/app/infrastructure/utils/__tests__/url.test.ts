import { pathWithoutLocale } from '../url';

describe('pathWithoutLocale', () => {
  it('should return the path without the locale', () => {
    expect(pathWithoutLocale('/en/path/to/something')).toBe(
      '/path/to/something',
    );
  });

  it('should return the path without the locale [2]', () => {
    expect(pathWithoutLocale('/pt/another-path')).toBe('/another-path');
  });

  it('should return the same path if it does not contain locale', () => {
    expect(pathWithoutLocale('/another-path')).toBe('/another-path');
  });
});
