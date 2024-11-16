import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import {
  SupportedLanguage,
  SupportedLanguages,
  SupportedLanguagesEnum,
} from '@raulmelo/core/intl';

export function getLanguageFromAcceptLanguage(acceptLanguageHeader: string) {
  const languages = new Negotiator({
    headers: {
      'accept-language': acceptLanguageHeader,
    },
  }).languages(SupportedLanguages as unknown as string[]);

  return match(
    languages,
    SupportedLanguages,
    SupportedLanguagesEnum.ENGLISH,
  ) as SupportedLanguage;
}
