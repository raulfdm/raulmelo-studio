import { SupportedLanguages } from '@types-app';

export function getPostUrl(postSlug: string, locale?: SupportedLanguages) {
  const result = `/blog/${postSlug}`;

  if (locale) {
    return `/${locale}${result}`;
  }

  return result;
}

export function getTagUrl(tagSlug: string) {
  return `/tag/${tagSlug}`;
}
