import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import type { SupportedLanguages } from '@/infrastructure/config/types/language';

export const supportedLocales = [`en`, `pt`];
const defaultLocale = `en`;

export function getLanguageFromAcceptLanguage(acceptLanguageHeader: string) {
  const languages = new Negotiator({
    headers: {
      'accept-language': acceptLanguageHeader,
    },
  }).languages(supportedLocales);

  return match(
    languages,
    supportedLocales,
    defaultLocale,
  ) as SupportedLanguages;
}
