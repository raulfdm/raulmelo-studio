import {
  SupportedLanguages,
  type SupportedLanguage,
} from '@raulmelo/core/intl';

export type SupportedLanguageOrAll = SupportedLanguage | 'all';
export const SUPPORTED_LANGUAGES_WITH_ALL = [
  'all',
  ...SupportedLanguages,
] as const;
