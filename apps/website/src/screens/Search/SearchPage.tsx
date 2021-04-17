import { PostCardWrapper } from '@components/PostCardWrapper';
import { SEO } from '@components/SEO';
import { algoliaConfig } from '@config/algolia';
import { useLocalization } from '@hooks/useLocalization';
import { AlgoliaIcon } from '@raulfdm/blog-components';
import { HitAlgolia } from '@types-app';
import React from 'react';
import { Hits, InstantSearch, SearchBox, Stats } from 'react-instantsearch-dom';
import { defineMessages } from 'react-intl';
import { algoliaDebounceSearchClient } from './utils';

const messages = defineMessages({
  stats: {
    id: 'search.stats',
  },
  input: {
    id: 'search.input',
  },
  seoDescription: {
    id: 'siteData.description',
  },
  seoTitle: {
    id: 'siteData.title',
  },
});

export const SearchPage = () => {
  const { formatMessage } = useLocalization();
  return (
    <>
      <SEO
        url="/search"
        description={formatMessage(messages.seoDescription)}
        title={formatMessage(messages.seoTitle)}
      />

      <InstantSearch
        searchClient={algoliaDebounceSearchClient}
        indexName={algoliaConfig.indexName}
      >
        <div className="pb-5 md:pb-10 col-span-full">
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
          <AlgoliaHits />
        </div>
        <PoweredByAlgolia />
      </InstantSearch>
    </>
  );
};

function PoweredByAlgolia() {
  return (
    <a
      className="flex justify-end items-center font-medium font-sans text-base col-span-full"
      href="https://www.algolia.com/"
    >
      Powered by <AlgoliaIcon className="w-8" color="#5468ff" /> Algolia
    </a>
  );
}

function AlgoliaHits() {
  return (
    <>
      <Hits
        hitComponent={({ hit }: { hit: HitAlgolia }) => {
          return <PostCardWrapper key={hit.objectID} post={hit} />;
        }}
      />

      <style jsx global>{`
        .ais-SearchBox-form input {
          font-size: 1.5rem;
          /* disable IOS native input styles */
          /* https://stackoverflow.com/a/2918716 */
          border-radius: 0;
          -webkit-appearance: none;
        }

        @media (min-width: 768px) {
          .ais-SearchBox-form input {
            font-size: 3rem;
          }
        }

        .ais-Hits-list {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          grid-gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .ais-Hits-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .ais-Hits-list {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
    </>
  );
}
