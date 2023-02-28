import { match } from '@formatjs/intl-localematcher';
import type { SupportedLanguages } from '@raulmelo/core';
import Negotiator from 'negotiator';

export const supportedLocales = ['en', 'pt'];
const defaultLocale = 'en';

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
