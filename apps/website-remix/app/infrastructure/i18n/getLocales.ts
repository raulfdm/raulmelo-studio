import flat from 'flat';

export async function getLocales(locale: string) {
  let messages: Record<string, string> = {};

  if (locale === `en`) {
    messages = (await import(
      `$infrastructure/locales/en.json`
    )) as unknown as Record<string, string>;
  } else if (locale === `pt`) {
    messages = (await import(
      `$infrastructure/locales/pt.json`
    )) as unknown as Record<string, string>;
  } else {
    throw new Error(`Locale not supported`);
  }

  return flat(messages) as Record<string, string>;
}
