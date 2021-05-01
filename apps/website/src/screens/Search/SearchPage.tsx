import { algoliaConfig } from '@config/algolia';
import { useLocalization } from '@hooks/useLocalization';
import { NextSeo } from 'next-seo';
import React from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Filters, Hits, PoweredBy, SearchBox } from './components';
import { AlgoliaGlobalStyles, searchStyles } from './styles';
import { algoliaDebounceSearchClient } from './utils';

const messages = defineMessages({
  pageTitle: {
    id: 'search.pageTitle',
  },
});

export const SearchPage = () => {
  const { formatMessage } = useLocalization();

  return (
    <>
      <NextSeo title={formatMessage(messages.pageTitle)} noindex />
      <AlgoliaGlobalStyles />

      <header css={searchStyles.header}>
        <h1 css={searchStyles.title}>
          <FormattedMessage id="search.pageTitle" />
        </h1>
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
};
