import {
  acceptedLanguagesCode,
  type AcceptedLanguagesCode,
} from '@raulmelo/core/language';

export type AcceptedLanguagesWithAll = AcceptedLanguagesCode | 'all';
export const ACCEPTED_LANGUAGES_WITH_ALL = [
  'all',
  ...acceptedLanguagesCode,
] as const;
