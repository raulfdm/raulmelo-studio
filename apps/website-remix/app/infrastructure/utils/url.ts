import type { SupportedLanguages } from '@raulmelo/core';

/**
 * TODO: Move those functions to core/domains/*
 */
export function getPostUrl(
  postSlug: string,
  locale?: SupportedLanguages,
): string {
  const result = `/blog/${postSlug}`;

  /**
   * I only want to generate url with locale when it's pt
   */
  if (locale && locale !== 'en') {
    return `/${locale}${result}`;
  }

  return result;
}

export function getTagUrl(tagSlug: string): string {
  return `/tag/${tagSlug}`;
}

export function getTilUrl(slug: string): string {
  return `/til/${slug}`;
}

export function pathWithoutLocale(path: string): string {
  /**
   * TODO: enhance this to use "support language" as const, not only types
   */
  const hasLocale = path.startsWith('/en') || path.startsWith('/pt');

  if (!hasLocale) {
    return path;
  }

  return path.substring(3, path.length);
}
