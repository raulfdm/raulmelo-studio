import { NextSeo } from 'next-seo';
import { InstantSearch } from 'react-instantsearch-dom';
import { defineMessages, FormattedMessage } from 'react-intl';

import { algoliaConfig } from '~/config/algolia';
import { useLocalization } from '~/hooks/useLocalization';

import { Filters, Hits, PoweredBy, SearchBox } from './components';
import { AlgoliaGlobalStyles, searchStyles } from './styles';
import { algoliaDebounceSearchClient } from './utils';

const messages = defineMessages({
  pageTitle: {
    id: 'search.pageTitle',
  },
});

export default function SearchPage() {
  const { formatMessage } = useLocalization();

  return (
    <>
      <NextSeo title={formatMessage(messages.pageTitle)} noindex />
      <AlgoliaGlobalStyles />

      <header css={searchStyles.header}>
        <h1 css={searchStyles.title}>
          <FormattedMessage id="search.pageTitle" />
        </h1>
        <p css={searchStyles.paragraph}>
          <FormattedMessage
            id="search.paragraph"
            values={{
              a: function Anchor(chunks: never) {
                return (
                  <a
                    css={searchStyles.searchLink}
                    href="https://www.google.com/search?q=site%3Araulmelo.dev+javascript"
                  >
                    {chunks}
                  </a>
                );
              } as unknown as React.ReactNode,
            }}
          />
        </p>
      </header>

      <InstantSearch
        searchClient={algoliaDebounceSearchClient}
        indexName={algoliaConfig.indexName}
      >
        <SearchBox />
        <Filters />
        <Hits />
        <PoweredBy />
      </InstantSearch>
    </>
  );
}
