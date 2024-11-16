import { createIntl, createIntlCache, type IntlShape } from '@formatjs/intl';
import { flatten } from 'flat';

import enLocales from './locales/en.json';
import ptLocales from './locales/pt.json';
import { SupportedLanguage, SupportedLanguagesEnum } from '@raulmelo/core/intl';

/**
 * Caches prevent memory leaks and improve performance by caching
 */
const enCache = createIntlCache();
const ptCache = createIntlCache();

const serverIntl: Record<SupportedLanguage, IntlShape<SupportedLanguage>> = {
  en: createIntl(
    {
      locale: SupportedLanguagesEnum.ENGLISH,
      messages: flatten(enLocales),
    },
    enCache,
  ),
  pt: createIntl(
    {
      locale: SupportedLanguagesEnum.PORTUGUESE,
      messages: flatten(ptLocales),
    },
    ptCache,
  ),
};

export function getIntl(
  locale: SupportedLanguage,
): IntlShape<SupportedLanguage> {
  const { success } = SupportedLanguage.safeParse(locale);

  if (!success) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  return serverIntl[locale];
}

export type AppIntl = ReturnType<typeof getIntl>;
