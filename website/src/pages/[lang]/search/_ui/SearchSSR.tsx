import {
  type InstantSearchServerState,
  InstantSearchSSRProvider,
} from 'react-instantsearch';

import type { SupportedLanguage } from '@raulmelo/core/intl';
import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';

import { Search, type SearchProps } from './Search';

interface SearchSsrProps
  extends Pick<SearchProps, 'appId' | 'indexName' | 'searchKey'> {
  lang: SupportedLanguage;
  searchServerState: InstantSearchServerState;
}

export function SearchSSR({
  lang,
  searchServerState,
  ...rest
}: SearchSsrProps) {
  const intl = getIntl(lang);
  return (
    <InstantSearchSSRProvider {...searchServerState}>
      <Search
        {...rest}
        lang={lang}
        tagsTitle={intl.formatMessage({ id: `search.filters.tags` })}
        languageTitle={intl.formatMessage({ id: `search.filters.lang` })}
        typeTitle={intl.formatMessage({ id: `search.filters.type` })}
        inputSearchPlaceholder={intl.formatMessage({ id: `search.input` })}
      />
    </InstantSearchSSRProvider>
  );
}
