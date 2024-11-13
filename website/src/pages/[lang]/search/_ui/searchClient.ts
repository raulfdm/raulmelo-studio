import { algoliasearch } from 'algoliasearch';

import { clientEnv } from '@/infrastructure/env/client';

export const searchClient = algoliasearch(
  clientEnv.PUBLIC_ALGOLIA_APP_ID,
  clientEnv.PUBLIC_ALGOLIA_SEARCH_KEY,
);
