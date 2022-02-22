import { SupportedLanguages } from 'src';

export const SUPPORTED_LANGUAGES = {
  en: 'en',
  pt: 'pt',
  get all(): SupportedLanguages[] {
    return [
      SUPPORTED_LANGUAGES.en as SupportedLanguages,
      SUPPORTED_LANGUAGES.pt as SupportedLanguages,
    ];
  },
};
