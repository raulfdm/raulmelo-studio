import type { IntlShape } from '@formatjs/intl';
import { createIntl, createIntlCache } from '@formatjs/intl';
import flat from 'flat';
import enLocales from '$infrastructure/locales/en.json';
import ptLocales from '$infrastructure/locales/pt.json';
import type { SupportedLanguages } from '@raulmelo/core/config';

/**
 * Caches prevent memory leaks and improve performance by caching
 */
const enCache = createIntlCache();
const ptCache = createIntlCache();

export const serverIntl: Record<
  SupportedLanguages,
  IntlShape<SupportedLanguages>
> = {
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
