import { z } from 'zod';

/**
 * Basic array of supported languages.
 */
export const SupportedLanguages = ['en', 'pt'] as const;

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
    code: 'en',
    name: 'English',
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
  },
};
