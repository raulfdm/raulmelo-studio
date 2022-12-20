import { useAppLocation } from '$infrastructure/hooks/useAppLocation';
import type { SupportedLanguages } from '@raulmelo/core';
import { useNavigate } from '@remix-run/react';
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
  const { pathname } = useAppLocation();
  const navigate = useNavigate();

  return (
    <IntlProvider locale={language} messages={messages}>
      <LocalizationContext.Provider
        value={{
          switchToPortuguese: () => switchLocale(`pt`),
          switchToEnglish: () => switchLocale(`en`),
          switchLocale,
        }}
      >
        {children}
      </LocalizationContext.Provider>
    </IntlProvider>
  );

  function switchLocale(nextLocale: SupportedLanguages): void {
    const nextPathname = getNextPathname(nextLocale, pathname as string);

    navigate(nextPathname);
  }
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
  Omit<IntlShape, `locale`> &
  Overrides;

export function useLocalization() {
  const intl = useIntl();
  const customIntl = useContext(LocalizationContext);

  if (!customIntl) {
    throw new Error(
      `useLocalization needs to be used under "LocalizationContext"`,
    );
  }

  return { ...intl, ...customIntl } as UseLocalization;
}

export function getNextPathname(
  nextLocale: SupportedLanguages,
  pathname: string,
) {
  const [slash, _locale, ...restPath] = pathname.split(`/`);

  if (nextLocale === `en`) {
    return [slash, ...restPath].join(`/`);
  }

  return [slash, nextLocale, ...restPath].join(`/`);
}
