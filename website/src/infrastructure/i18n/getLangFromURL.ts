import { SupportedLanguage } from '@raulmelo/core/intl';

export function getLangFromURL(url: string): SupportedLanguage | null {
  const pathname = new URL(url).pathname;

  const [_, locale] = pathname.split(`/`);

  const result = SupportedLanguage.safeParse(locale);

  if (!result.success) {
    return null;
  }

  return result.data;
}
