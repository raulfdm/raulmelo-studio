import { SupportedLanguages } from '@raulmelo/core';
import flat from 'flat';
import { useRouter } from 'next/router';
import { createContext, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from 'src/locales/en.json';
import ptMessages from 'src/locales/pt.json';

export type LocalizationContextType = {
  switchToPortuguese(): void;
  switchToEnglish(): void;
  switchLocale(nextLocale: SupportedLanguages): void;
};

export const LocalizationContext = createContext<
  LocalizationContextType | undefined
>(undefined);

const localizedMessages = {
  en: enMessages,
  pt: ptMessages,
};

/**
 * TODO: fix this type.
 *
 * react-intl interfaces are not compatible with React 18 types.
 */
const CastedIntlProvider = IntlProvider as any;

export const LocalizationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { locale = 'en', push, pathname, query, asPath } = useRouter();

  function switchLocale(nextLocale: SupportedLanguages): void {
    /**
     * This is the way Next recommends to switch locale programmatically.
     * Basically we need to pass the same route we're with the next locale
     * and Next will handle the logic for us
     */

    /**
     * In this page, I want to prevent while switching locale, persisting the
     * pagination.
     *
     * If the user is in PT page 2 and switch to english, I don't want he/she
     * seeing page 2 of EN. Instead, I want to reset that to "/"
     *
     * It's a bit weak having it here since I'm kinda mixing business logic of
     * Home (/blog) pagination within the switch locale, but I have to investigate
     * deeper how can I listen for router changes so I can call this logic there.
     */
    const pageRegex = /\?page=\w/gi;
    const cleanedAsPath = asPath.replace(pageRegex, '');
    delete query.page;

    push({ pathname, query }, cleanedAsPath, { locale: nextLocale });
  }

  function switchToEnglish(): void {
    switchLocale('en');
  }

  function switchToPortuguese(): void {
    switchLocale('pt');
  }

  const messages = useMemo(
    () =>
      flat(localizedMessages[locale! as SupportedLanguages]) as Record<
        string,
        string
      >,
    [locale],
  );

  return (
    <CastedIntlProvider locale={locale!} messages={messages}>
      <LocalizationContext.Provider
        value={{ switchToPortuguese, switchToEnglish, switchLocale }}
      >
        {children}
      </LocalizationContext.Provider>
    </CastedIntlProvider>
  );
};
