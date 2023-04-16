import { clientEnv } from '@/infrastructure/env/client';
import algoliaSearch from 'algoliasearch/lite';

export const searchClient = algoliaSearch(
  clientEnv.PUBLIC_ALGOLIA_APP_ID,
  clientEnv.PUBLIC_ALGOLIA_SEARCH_KEY,
);
