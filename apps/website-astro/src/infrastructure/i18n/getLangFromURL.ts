import type { SupportedLanguages } from '@raulmelo/core';
import { supportedLanguagesSchema } from '@raulmelo/core';

export function getLangFromURL(url: string): null | SupportedLanguages {
  const pathname = new URL(url).pathname;

  const [_, locale] = pathname.split('/');
  console.log('pathname', pathname);

  const result = supportedLanguagesSchema.safeParse(locale);

  if (!result.success) {
    return null;
  }

  return result.data;
}
