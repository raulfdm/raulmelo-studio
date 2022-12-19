import { z } from 'zod';

export const SUPPORTED_LANGUAGES = ['en', 'pt'] as const;
export const supportedLanguagesSchema = z.enum(SUPPORTED_LANGUAGES);
export type SupportedLanguages = z.infer<typeof supportedLanguagesSchema>;

export const SUPPORTED_LANGUAGES_WITH_ALL = [
  ...SUPPORTED_LANGUAGES,
  'all',
] as const;
export const supportedLanguagesWithAll = z.enum(SUPPORTED_LANGUAGES_WITH_ALL);
export type SupportedLanguagesWithAll = z.infer<
  typeof supportedLanguagesWithAll
>;
