import type { AppTheme } from '@raulmelo/core';

declare global {
  interface Window {
    __theme: AppTheme;
    twttr?: any;
  }

  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV?: `local` | `preview` | `production`;
      ALGOLIA_APP_ID?: string;
      ALGOLIA_SEARCH_KEY?: string;
      ALGOLIA_INDEX_NAME?: string;
    }
  }
}
