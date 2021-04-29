import { AlgoliaIcon } from '@components/Icons';
import { PostCardWrapper } from '@components/PostCardWrapper';
import { algoliaConfig } from '@config/algolia';
import { Global } from '@emotion/react';
import { useLocalization } from '@hooks/useLocalization';
import { HitAlgolia } from '@types-app';
import { NextSeo } from 'next-seo';
import React from 'react';
import { Hits, InstantSearch, SearchBox, Stats } from 'react-instantsearch-dom';
import { defineMessages } from 'react-intl';
import 'twin.macro';
import { algoliaGlobalStyles } from './styles';
import { algoliaDebounceSearchClient } from './utils';

const messages = defineMessages({
  stats: {
    id: 'search.stats',
  },
  input: {
    id: 'search.input',
  },
  pageTitle: {
    id: 'search.pageTitle',
  },
});

export const SearchPage = () => {
  const { formatMessage } = useLocalization();

  return (
    <>
      <NextSeo title={formatMessage(messages.pageTitle)} noindex />
      <Global styles={algoliaGlobalStyles} />

      <InstantSearch
        searchClient={algoliaDebounceSearchClient}
        indexName={algoliaConfig.indexName}
      >
        <div tw="pb-5 md:pb-10 col-span-full">
          <SearchBox
            searchAsYouType
            autoFocus
            translations={{ placeholder: formatMessage(messages.input) }}
          />
          <Stats
            translations={{
              stats(results, milliseconds) {
                return formatMessage(messages.stats, {
                  results,
                  milliseconds,
                });
              },
            }}
          />
          <Hits
            hitComponent={({ hit }: { hit: HitAlgolia }) => {
              return <PostCardWrapper key={hit.objectID} post={hit} />;
            }}
          />
        </div>
        <PoweredByAlgolia />
      </InstantSearch>
    </>
  );
};

function PoweredByAlgolia() {
  return (
    <a
      tw="flex justify-end items-center font-medium font-sans text-base col-span-full"
      href="https://www.algolia.com/"
    >
      Powered by <AlgoliaIcon tw="w-8" color="#5468ff" /> Algolia
    </a>
  );
}
