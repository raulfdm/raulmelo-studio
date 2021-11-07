import {
  LocalizationContext,
  LocalizationContextType,
} from '@contexts/Localization';
import { SupportedLanguages } from '@raulfdm/core';
import { useContext } from 'react';
import { IntlShape, useIntl } from 'react-intl';

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

export const useLocalization = () => {
  const intl = useIntl();
  const customIntl = useContext(LocalizationContext);

  if (!customIntl) {
    throw new Error(
      'useLocalization needs to be used under "LocalizationContext"',
    );
  }

  return { ...intl, ...customIntl } as UseLocalization;
};
