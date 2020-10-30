import { createContext, useCallback, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import flat from 'flat';
import useLocalStorage from 'react-use/lib/useLocalStorage';

import { SupportedLanguages } from '@types-app';
import enMessages from 'src/locales/en.json';
import ptMessages from 'src/locales/pt-br.json';

const LOCALE_LOCAL_STORAGE_KEY = 'raul-melo.dev__lang';

export type LocalizationContextType = {
  switchToPortuguese(): void;
  switchToEnglish(): void;
  switchLocale(nextLocale: SupportedLanguages): void;
};

export const LocalizationContext = createContext<
  LocalizationContextType | undefined
>(undefined);

const supportedLanguagesList: SupportedLanguages[] = ['en', 'pt'];

const getBrowserUrl = (fallback = 'en') => {
  const sanitizedFallback = fallback.replace(/-.*/, '');

  const isLangSupported = supportedLanguagesList.includes(
    sanitizedFallback as any,
  );

  return isLangSupported ? sanitizedFallback : 'en';
};

const localizedMessages = {
  en: enMessages,
  pt: ptMessages,
};

type LocalizationProviderProps = {
  lang?: string;
};

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
  lang,
}) => {
  const [language, setLanguage] = useLocalStorage<SupportedLanguages>(
    LOCALE_LOCAL_STORAGE_KEY,
    getBrowserUrl(lang) as SupportedLanguages,
  );

  function switchLocale(nextLanguage: SupportedLanguages): void {
    setLanguage(nextLanguage);
  }

  const messages = useMemo(
    () => flat(localizedMessages[language!]) as Record<string, string>,
    [language],
  );

  const switchToEnglish = useCallback(function switchToEnglish(): void {
    switchLocale('en');
  }, []);

  const switchToPortuguese = useCallback(function switchToPortuguese(): void {
    switchLocale('pt');
  }, []);

  return (
    <IntlProvider locale={language!} messages={messages}>
      <LocalizationContext.Provider
        value={{ switchToPortuguese, switchToEnglish, switchLocale }}
      >
        {children}
      </LocalizationContext.Provider>
    </IntlProvider>
  );
};
