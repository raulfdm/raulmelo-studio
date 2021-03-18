import { SupportedLanguages } from '@types-app';

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
