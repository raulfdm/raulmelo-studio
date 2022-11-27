import type { SupportedLanguages } from '@raulmelo/core';

/**
 * TODO: Move those functions to core/domains/*
 */
export function getPostUrl(
  postSlug: string,
  locale: SupportedLanguages,
): string {
  return getPathnameWithLocale(`/blog/${postSlug}`, locale);
}

export function getTagUrl(tagSlug: string, locale: SupportedLanguages): string {
  return getPathnameWithLocale(`/tag/${tagSlug}`, locale);
}

export function getTilUrl(slug: string, locale: SupportedLanguages): string {
  return getPathnameWithLocale(`/til/${slug}`, locale);
}

export function getPathnameWithoutLocale(pathname: string): string {
  /**
   * TODO: enhance this to use "support language" as const, not only types
   */
  const hasLocale = pathname.startsWith('/en') || pathname.startsWith('/pt');

  if (!hasLocale) {
    return pathname;
  }

  const result = pathname.substring(3, pathname.length);

  return result === '' ? '/' : result;
}

export function getPathnameWithLocale(
  pathname: string,
  locale: SupportedLanguages,
) {
  const hasLocale = pathname.startsWith(`/${locale}`);

  if (hasLocale) {
    return pathname;
  }

  return `/${locale}${pathname}`;
}
