import { z } from 'zod';

export const SUPPORTED_LANGUAGES = ['en', 'pt'] as const;
export const SupportedLanguages = z.enum(SUPPORTED_LANGUAGES);
export type SupportedLanguages = z.infer<typeof SupportedLanguages>;

export const SUPPORTED_LANGUAGES_WITH_ALL = [
  ...SUPPORTED_LANGUAGES,
  'all',
] as const;
export const SupportedLanguagesWithAll = z.enum(SUPPORTED_LANGUAGES_WITH_ALL);
export type SupportedLanguagesWithAll = z.infer<
  typeof SupportedLanguagesWithAll
>;
