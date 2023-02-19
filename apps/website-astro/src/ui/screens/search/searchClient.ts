import algoliaSearch from 'algoliasearch/lite';
import invariant from 'tiny-invariant';

invariant(
  import.meta.env.PUBLIC_ALGOLIA_APP_ID,
  'Missing PUBLIC_ALGOLIA_APP_ID',
);
invariant(
  import.meta.env.PUBLIC_ALGOLIA_SEARCH_KEY,
  'Missing PUBLIC_ALGOLIA_SEARCH_KEY',
);

export const searchClient = algoliaSearch(
  import.meta.env.PUBLIC_ALGOLIA_APP_ID,
  import.meta.env.PUBLIC_ALGOLIA_SEARCH_KEY,
);
