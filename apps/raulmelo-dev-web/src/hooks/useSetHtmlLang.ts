import { useEffect } from 'react';

import { SupportedLanguages } from '@types-app';

export function useSetHtmlLang(lang: SupportedLanguages = 'en') {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, []);
}
