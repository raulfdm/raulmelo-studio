import flat from 'flat';
import enLocales from '$infrastructure/locales/en.json';
import ptLocales from '$infrastructure/locales/pt.json';

type LocaleMessages = typeof ptLocales | typeof enLocales;

export async function getLocales(
  locale: string,
): Promise<Record<string, string>> {
  let messages: LocaleMessages;

  switch (locale) {
    case `en`:
      messages = enLocales;
      break;

    case `pt`:
      messages = ptLocales;
      break;

    default:
      throw new Error(`Locale not supported: ${locale}`);
  }

  return flat(messages);
}
