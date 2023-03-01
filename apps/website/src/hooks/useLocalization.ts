import type { SupportedLanguages } from '@raulmelo/core/config';
import { useContext } from 'react';
import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';

import type { LocalizationContextType } from '~/contexts/Localization';
import { LocalizationContext } from '~/contexts/Localization';

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
