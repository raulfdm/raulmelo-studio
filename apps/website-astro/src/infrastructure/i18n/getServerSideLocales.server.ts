import type { IntlShape } from '@formatjs/intl';
import { createIntl, createIntlCache } from '@formatjs/intl';
import { SupportedLanguages, supportedLanguagesSchema } from '@raulmelo/core';
import flat from 'flat';

import enLocales from './locales/en.json';
import ptLocales from './locales/pt.json';

/**
 * Caches prevent memory leaks and improve performance by caching
 */
const enCache = createIntlCache();
const ptCache = createIntlCache();

const serverIntl: Record<SupportedLanguages, IntlShape<SupportedLanguages>> = {
  en: createIntl(
    {
      locale: `en`,
      messages: flat(enLocales),
    },
    enCache,
  ),
  pt: createIntl(
    {
      locale: `pt`,
      messages: flat(ptLocales),
    },
    ptCache,
  ),
};

export function getIntl(
  locale: SupportedLanguages,
): IntlShape<SupportedLanguages> {
  const { success } = supportedLanguagesSchema.safeParse(locale);

  if (!success) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  return serverIntl[locale];
}

export type Intl = ReturnType<typeof getIntl>;
