import { z } from 'zod';

export const SupportedLanguagesEnum = {
  ENGLISH: 'en',
  PORTUGUESE: 'pt',
} as const;
/**
 * Basic array of supported languages.
 */
export const SupportedLanguages = [
  SupportedLanguagesEnum.ENGLISH,
  SupportedLanguagesEnum.PORTUGUESE,
] as const;

/**
 * Supported language zod schema and type.
 */
export const SupportedLanguage = z.enum(SupportedLanguages);
export type SupportedLanguage = z.infer<typeof SupportedLanguage>;

/**
 * Supported language containing names
 */
export const SupportedLanguageNames: Record<
  SupportedLanguage,
  {
    code: SupportedLanguage;
    name: string;
  }
> = {
  en: {
    code: SupportedLanguagesEnum.ENGLISH,
    name: 'English',
  },
  pt: {
    code: SupportedLanguagesEnum.PORTUGUESE,
    name: 'Português',
  },
};
