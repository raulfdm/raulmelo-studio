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
import tw, { css } from 'twin.macro';
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
      <Global styles={algoliaStyles} />

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

const algoliaStyles = css`
  .ais-SearchBox-form input {
    ${tw`text-xl md:text-3xl`}
    /* disable IOS native input styles */
    /* https://stackoverflow.com/a/2918716 */
    ${tw`rounded-none`}
    -webkit-appearance: none;
  }

  .ais-Hits-list {
    ${tw`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
  }
`;
