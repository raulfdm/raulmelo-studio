import { AppTheme } from '@raulmelo/core/config';

declare global {
  interface Window {
    __theme: AppTheme;
    twttr?: any;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ALGOLIA_APP_ID: string;
      NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: string;
      NEXT_PUBLIC_ALGOLIA_INDEX_NAME: string;
    }
  }
}

export {};
