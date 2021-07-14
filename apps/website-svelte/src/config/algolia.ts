import algoliaSearch from 'algoliasearch/lite';

export const algoliaConfig = {
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  searchOnlyApiKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
  indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
};

export const algoliaClient = algoliaSearch(
  algoliaConfig.appId,
  algoliaConfig.searchOnlyApiKey,
);
