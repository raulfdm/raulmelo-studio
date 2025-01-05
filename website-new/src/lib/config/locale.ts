import type { AstroUserConfig } from 'astro';

const ACCEPTED_LOCALES = ['en', 'pt-br'] as const;
type Locale = (typeof ACCEPTED_LOCALES)[number];

export const i18nConfig = {
  defaultLocale: 'pt-br',
  locales: [
    'en',
    {
      path: 'pt-br',
      codes: ['pt-br', 'pt'],
    },
  ],
  routing: 'manual',
} as const satisfies AstroUserConfig['i18n'];

export function getValidLocale(locale = ''): Locale | null {
  locale = locale.toLowerCase();
  return ACCEPTED_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : null;
}

export function getValidLocaleFromLocaleList(
  localeList: string[] = [],
): Locale | null {
  for (let locale of localeList) {
    if (typeof locale !== 'string') {
      continue;
    }

    locale = locale.toLowerCase();

    const validLocale = getValidLocale(locale);

    if (validLocale) {
      return validLocale;
    }
  }

  return null;
}
