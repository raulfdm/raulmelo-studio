import type { SupportedLanguage } from '@raulmelo/core/intl';

export function getHomePageUrl(locale: SupportedLanguage): string {
  const nextUrl = `/`;

  return getPathnameWithLocale(nextUrl, locale);
}

export function getBlogHomeUrl(locale: SupportedLanguage): string {
  const nextUrl = `/blog`;

  return getPathnameWithLocale(nextUrl, locale);
}

export function getSnippetsHomeUrl(locale: SupportedLanguage): string {
  const nextUrl = `/snippets`;

  return getPathnameWithLocale(nextUrl, locale);
}

export function getTagsHomeUrl(locale: SupportedLanguage): string {
  const nextUrl = `/tags`;

  return getPathnameWithLocale(nextUrl, locale);
}

export function getTilHomeUrl(locale: SupportedLanguage): string {
  const nextUrl = `/til`;

  return getPathnameWithLocale(nextUrl, locale);
}

/**
 * TODO: Move those functions to core/domains/*
 */
export function getPostUrl(
  postSlug: string,
  locale: SupportedLanguage,
): string {
  const nextUrl = `/blog/${postSlug}`;

  return getPathnameWithLocale(nextUrl, locale);
}

export function getTagUrl(tagSlug: string, locale: SupportedLanguage): string {
  const nextUrl = `/tags/${tagSlug}`;

  return getPathnameWithLocale(nextUrl, locale);
}

export function getSnippetUrl(
  snippetSlug: string,
  locale: SupportedLanguage,
): string {
  const nextUrl = `/snippets/${snippetSlug}`;

  return getPathnameWithLocale(nextUrl, locale);
}

export function getTilUrl(slug: string, locale: SupportedLanguage): string {
  const nextUrl = `/til/${slug}`;

  return getPathnameWithLocale(nextUrl, locale);
}

export function getPathnameWithoutLocale(pathname: string): string {
  /**
   * TODO: enhance this to use "support language" as const, not only types
   */
  const hasLocale = pathname.startsWith(`/en`) || pathname.startsWith(`/pt`);

  if (!hasLocale) {
    return pathname;
  }

  const result = pathname.substring(3, pathname.length);

  return result === `` ? `/` : result;
}

export function getPathnameWithLocale(
  pathname: string,
  locale: SupportedLanguage,
) {
  const hasLocale = pathname.startsWith(`/${locale}`);

  if (/* locale === SupportedLanguagesEnum.ENGLISH || */ hasLocale) {
    return pathname;
  }

  return removeTrailingSlash(`/${locale}${pathname}`);
}

export function sanitizeUrl(url: string): string {
  if (!url.startsWith(`http`)) {
    return url.replaceAll(`//`, `/`);
  }

  const nextUrl = new URL(url);
  nextUrl.pathname = nextUrl.pathname.replaceAll(`//`, `/`);

  return nextUrl.href;
}

function removeTrailingSlash(pathname: string): string {
  return pathname.replace(/\/$/, ``);
}
