import algoliaSearch from 'algoliasearch/lite';

import { clientEnv } from '@/infrastructure/env/client';

export const searchClient = algoliaSearch(
  clientEnv.PUBLIC_ALGOLIA_APP_ID,
  clientEnv.PUBLIC_ALGOLIA_SEARCH_KEY,
);
