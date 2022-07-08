import { NextSeo } from 'next-seo';
import { InstantSearch } from 'react-instantsearch-dom';
import { defineMessages, FormattedMessage } from 'react-intl';

import { algoliaConfig } from '~/config/algolia';
import { useLocalization } from '~/hooks/useLocalization';

import { Filters, Hits, PoweredBy, SearchBox } from './components';
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

      <header className="mb-6 col-span-full">
        <h1 className="text-3xl font-extrabold md:text-4xl col-span-full">
          <FormattedMessage id="search.pageTitle" />
        </h1>
        <p className="text-lg">
          <FormattedMessage
            id="search.paragraph"
            values={{
              a: function Anchor(chunks: never) {
                return (
                  <a
                    className="underline text-secondary"
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
