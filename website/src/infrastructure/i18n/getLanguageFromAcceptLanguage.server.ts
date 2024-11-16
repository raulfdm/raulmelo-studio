import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import type { SupportedLanguage } from '@raulmelo/core/intl';

export const supportedLocales = [`en`, `pt`];
const defaultLocale = `en`;

export function getLanguageFromAcceptLanguage(acceptLanguageHeader: string) {
  const languages = new Negotiator({
    headers: {
      'accept-language': acceptLanguageHeader,
    },
  }).languages(supportedLocales);

  return match(languages, supportedLocales, defaultLocale) as SupportedLanguage;
}
