import {
  type SupportedLanguages,
  supportedLanguagesSchema,
} from '@raulmelo/core/config';

export function getLangFromURL(url: string): null | SupportedLanguages {
  const pathname = new URL(url).pathname;

  const [_, locale] = pathname.split(`/`);

  const result = supportedLanguagesSchema.safeParse(locale);

  if (!result.success) {
    return null;
  }

  return result.data;
}
