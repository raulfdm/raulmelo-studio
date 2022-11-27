import type { SupportedLanguages } from '@raulmelo/core';
import { useLocation, useNavigate } from '@remix-run/react';
import { createContext, useContext } from 'react';
import type { IntlShape } from 'react-intl';
import { IntlProvider, useIntl } from 'react-intl';

type LocalizationContextType = {
  switchToPortuguese(): void;
  switchToEnglish(): void;
  switchLocale(nextLocale: SupportedLanguages): void;
};

const LocalizationContext = createContext<LocalizationContextType | null>(null);

export const LocalizationProvider = ({
  children,
  language,
  messages,
}: {
  children: React.ReactNode;
  language: SupportedLanguages;
  messages: Record<string, string>;
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // const { push, pathname, query, asPath } = useRouter();

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
    // const cleanedAsPath = asPath.replace(pageRegex, '');
    // delete query.page;

    // push({ pathname, query }, cleanedAsPath, { locale: nextLocale });
  }

  function switchToEnglish(): void {
    switchLocale('en');
  }

  function switchToPortuguese(): void {
    switchLocale('pt');
  }

  return (
    <IntlProvider locale={language} messages={messages}>
      <LocalizationContext.Provider
        value={{ switchToPortuguese, switchToEnglish, switchLocale }}
      >
        {children}
      </LocalizationContext.Provider>
    </IntlProvider>
  );
};

/**
 * react-intl has "locale" which is a string.
 * However in this app it can only be "pt" or "en"
 * so it doesn't make sense allowing it be "string"
 */
type Overrides = {
  locale: SupportedLanguages;
};

type UseLocalization = LocalizationContextType &
  Omit<IntlShape, 'locale'> &
  Overrides;

export function useLocalization() {
  const intl = useIntl();
  const customIntl = useContext(LocalizationContext);

  if (!customIntl) {
    throw new Error(
      'useLocalization needs to be used under "LocalizationContext"',
    );
  }

  return { ...intl, ...customIntl } as UseLocalization;
}
