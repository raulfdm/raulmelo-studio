import React from 'react';
import { Algolia } from '@styled-icons/boxicons-logos/Algolia';
import { defineMessages } from 'react-intl';
import { InstantSearch, SearchBox, Hits, Stats } from 'react-instantsearch-dom';

import { AppThemeProvider } from '@contexts/AppTheme';
import { GlobalStyles } from '@styles/index';
import { SEO } from '@components/SEO';
import { useLocalization } from '@hooks/useLocalization';
import { algoliaConfig } from '@config/algolia';
import { HitAlgolia } from '@types-app';
import { PostCard } from '@components/PostCard';
import { MenuBar } from '@components/MenuBar';
import { algoliaDebounceSearchClient } from './utils';
import { PoweredBy, SearchWrapper, SearchBoxWrapper } from './styled';

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
      <AppThemeProvider>
        <GlobalStyles />
        <MenuBar />

        <SearchWrapper as="main">
          <InstantSearch
            searchClient={algoliaDebounceSearchClient}
            indexName={algoliaConfig.indexName}
          >
            <SearchBoxWrapper>
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
            </SearchBoxWrapper>

            <PoweredByAlgolia />
          </InstantSearch>
        </SearchWrapper>
      </AppThemeProvider>
    </>
  );
};

function PoweredByAlgolia() {
  return (
    <PoweredBy href="https://www.algolia.com/">
      Powered by <Algolia size="2rem" color="#5468ff" /> Algolia
    </PoweredBy>
  );
}

function AlgoliaHits() {
  return (
    <Hits
      hitComponent={({ hit }: { hit: HitAlgolia }) => {
        const { timeToRead, excerpt } = hit;

        const post = {
          ...hit,
          childStrapiPostContent: {
            childMdx: { excerpt, timeToRead },
          },
        };

        return <PostCard post={post as any} key={hit.objectID} />;
      }}
    />
  );
}
