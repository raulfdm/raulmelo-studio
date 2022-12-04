import algoliaSearch from 'algoliasearch/lite';

export const searchClient = algoliaSearch(
  ENV.search.appId,
  ENV.search.searchOnlyApiKey,
);
