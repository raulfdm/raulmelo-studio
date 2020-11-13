import { createContext, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import flat from 'flat';

import { SupportedLanguages } from '@types-app';
import enMessages from 'src/locales/en.json';
import ptMessages from 'src/locales/pt.json';
import { useRouter } from 'next/router';

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

export const LocalizationProvider: React.FC = ({ children }) => {
  const { locale = 'en', push, pathname, query, asPath } = useRouter();

  function switchLocale(nextLocale: SupportedLanguages): void {
    /**
     * This is the way Next recommends to switch locale programmatically.
     * Basically we need to pass the same route we're with the next locale
     * and Next will handle the logic for us
     */

    push({ pathname, query }, asPath, { locale: nextLocale });
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
    <IntlProvider locale={locale!} messages={messages}>
      <LocalizationContext.Provider
        value={{ switchToPortuguese, switchToEnglish, switchLocale }}
      >
        {children}
      </LocalizationContext.Provider>
    </IntlProvider>
  );
};
