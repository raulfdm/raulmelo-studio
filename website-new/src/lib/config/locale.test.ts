import { describe, it, expect } from 'vitest';
import { getValidLocale, getValidLocaleFromLocaleList } from './locale';

describe('getValidLocale', () => {
  it('should return the locale if it is valid', () => {
    expect(getValidLocale('en')).toBe('en');
    expect(getValidLocale('pt-br')).toBe('pt-br');
  });

  it('should return null for invalid locales', () => {
    expect(getValidLocale('es')).toBeNull();
    expect(getValidLocale('fr')).toBeNull();
    expect(getValidLocale('pt')).toBeNull();
  });

  it('should handle empty string input', () => {
    expect(getValidLocale('')).toBeNull();
  });

  it('should handle undefined input', () => {
    expect(getValidLocale(undefined)).toBeNull();
  });

  it('should handle case-sensitive matching', () => {
    expect(getValidLocale('EN')).toBe('en');
    expect(getValidLocale('PT-BR')).toBe('pt-br');
    expect(getValidLocale('Pt-Br')).toBe('pt-br');
  });
});

describe('getValidLocaleFromLocaleList', () => {
  it('should return the first valid locale from the list', () => {
    expect(getValidLocaleFromLocaleList(['en', 'pt-br'])).toBe('en');
    expect(getValidLocaleFromLocaleList(['es', 'pt-br'])).toBe('pt-br');
    expect(getValidLocaleFromLocaleList(['es', 'fr', 'en'])).toBe('en');
  });

  it('should return null if no valid locales are found', () => {
    expect(getValidLocaleFromLocaleList(['es', 'fr'])).toBeNull();
    expect(getValidLocaleFromLocaleList(['de', 'it', 'fr'])).toBeNull();
  });

  it('should handle empty array input', () => {
    expect(getValidLocaleFromLocaleList([])).toBeNull();
  });

  it('should handle undefined input', () => {
    expect(getValidLocaleFromLocaleList(undefined)).toBeNull();
  });

  it('should handle mixed case and invalid locales', () => {
    expect(getValidLocaleFromLocaleList(['ES', 'PT-BR', 'en'])).toBe('pt-br');

    expect(getValidLocaleFromLocaleList(['pt', 'pt-br', 'EN'])).toBe('pt-br');
  });

  it('should handle arrays with empty strings and invalid values', () => {
    expect(getValidLocaleFromLocaleList(['', 'en'])).toBe('en');
    expect(getValidLocaleFromLocaleList(['', '', 'pt-br'])).toBe('pt-br');
    expect(
      getValidLocaleFromLocaleList(['', null, undefined, 'en'] as string[]),
    ).toBe('en');
  });
});
