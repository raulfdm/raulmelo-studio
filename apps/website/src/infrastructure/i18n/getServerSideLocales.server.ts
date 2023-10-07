import { createIntl, createIntlCache, type IntlShape } from '@formatjs/intl';
import {
  type SupportedLanguages,
  supportedLanguagesSchema,
} from '@raulmelo/core/config';
import { flatten } from 'flat';

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
      messages: flatten(enLocales),
    },
    enCache,
  ),
  pt: createIntl(
    {
      locale: `pt`,
      messages: flatten(ptLocales),
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

export type AppIntl = ReturnType<typeof getIntl>;
