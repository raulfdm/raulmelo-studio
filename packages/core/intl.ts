import { z } from 'zod';

export const SupportedLanguage = ['en', 'pt'] as const;
export type SupportedLanguage = (typeof SupportedLanguage)[number];

export const SupportedLanguages = z.enum(SupportedLanguage);
export type SupportedLanguages = z.infer<typeof SupportedLanguages>;

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
