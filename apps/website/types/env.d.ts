import { SupportedThemes } from '@raulfdm/core';

declare global {
  interface Window {
    __theme: SupportedThemes;
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
