import algoliaSearch from 'algoliasearch/lite';

import { getClientEnv } from '@/infrastructure/env/client';

const clientEnv = getClientEnv();

export const searchClient = algoliaSearch(
  clientEnv.PUBLIC_ALGOLIA_APP_ID,
  clientEnv.PUBLIC_ALGOLIA_SEARCH_KEY,
);
