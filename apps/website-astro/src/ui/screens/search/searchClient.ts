import algoliaSearch from 'algoliasearch/lite';
import invariant from 'tiny-invariant';

invariant(process.env.PUBLIC_ALGOLIA_APP_ID, 'Missing PUBLIC_ALGOLIA_APP_ID');
invariant(
  process.env.PUBLIC_ALGOLIA_SEARCH_KEY,
  'Missing PUBLIC_ALGOLIA_SEARCH_KEY',
);

export const searchClient = algoliaSearch(
  process.env.PUBLIC_ALGOLIA_APP_ID,
  process.env.PUBLIC_ALGOLIA_SEARCH_KEY,
);
