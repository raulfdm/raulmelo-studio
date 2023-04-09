import { type SupportedLanguages } from '@raulmelo/core/config';

export function getHomePageUrl(locale: SupportedLanguages): string {
  const nextUrl = `/`;

  return getPathnameWithLocale(nextUrl, locale);
}

export function getBlogHomeUrl(locale: SupportedLanguages): string {
  const nextUrl = `/blog`;

  return getPathnameWithLocale(nextUrl, locale);
}

export function getTagsHomeUrl(locale: SupportedLanguages): string {
  const nextUrl = `/tags`;

  return getPathnameWithLocale(nextUrl, locale);
}

export function getTilHomeUrl(locale: SupportedLanguages): string {
  const nextUrl = `/til`;

  return getPathnameWithLocale(nextUrl, locale);
}

/**
 * TODO: Move those functions to core/domains/*
 */
export function getPostUrl(
  postSlug: string,
  locale: SupportedLanguages,
): string {
  const nextUrl = `/blog/${postSlug}`;

  return getPathnameWithLocale(nextUrl, locale);
}

export function getTagUrl(tagSlug: string, locale: SupportedLanguages): string {
  const nextUrl = `/tags/${tagSlug}`;

  return getPathnameWithLocale(nextUrl, locale);
}

export function getTilUrl(slug: string, locale: SupportedLanguages): string {
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
  locale: SupportedLanguages,
) {
  const hasLocale = pathname.startsWith(`/${locale}`);

  if (/* locale === `en` || */ hasLocale) {
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
