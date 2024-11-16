import {
  type InstantSearchServerState,
  InstantSearchSSRProvider,
} from 'react-instantsearch';

import type { AcceptedLanguagesCode } from '@raulmelo/core/language';
import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';

import { Search } from './Search';

type Props = {
  lang: AcceptedLanguagesCode;
  searchServerState: InstantSearchServerState;
};

export function SearchSSR({ lang, searchServerState }: Props) {
  const intl = getIntl(lang);
  return (
    <InstantSearchSSRProvider {...searchServerState}>
      <Search
        lang={lang}
        tagsTitle={intl.formatMessage({ id: `search.filters.tags` })}
        languageTitle={intl.formatMessage({ id: `search.filters.lang` })}
        typeTitle={intl.formatMessage({ id: `search.filters.type` })}
        inputSearchPlaceholder={intl.formatMessage({ id: `search.input` })}
      />
    </InstantSearchSSRProvider>
  );
}
