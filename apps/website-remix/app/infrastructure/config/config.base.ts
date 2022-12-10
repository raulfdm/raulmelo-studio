import invariant from 'tiny-invariant';
import type { AppConfig } from './types';

invariant(process.env.ALGOLIA_APP_ID, `ALGOLIA_APP_ID is required`);
invariant(process.env.ALGOLIA_SEARCH_KEY, `ALGOLIA_SEARCH_KEY is required`);
invariant(process.env.ALGOLIA_INDEX_NAME, `ALGOLIA_INDEX_NAME is required`);
invariant(process.env.GOOGLE_ANALYTICS_ID, `GOOGLE_ANALYTICS_ID is required`);

export const baseConfig: AppConfig = {
  search: {
    indexName: process.env.ALGOLIA_INDEX_NAME,
    appId: process.env.ALGOLIA_APP_ID,
    searchOnlyApiKey: process.env.ALGOLIA_SEARCH_KEY,
  },
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
};
