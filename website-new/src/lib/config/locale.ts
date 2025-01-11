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

export function isAcceptedLocale(locale: string): locale is Locale {
  return ACCEPTED_LOCALES.includes(locale as Locale);
}
