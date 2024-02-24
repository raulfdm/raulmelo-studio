import { SupportedLanguages } from '../config/types/language';

export function getLangFromURL(url: string): null | SupportedLanguages {
  const pathname = new URL(url).pathname;

  const [_, locale] = pathname.split(`/`);

  const result = SupportedLanguages.safeParse(locale);

  if (!result.success) {
    return null;
  }

  return result.data;
}
