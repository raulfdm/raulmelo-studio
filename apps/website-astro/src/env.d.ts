/// <reference types="@astrojs/image/client" />

declare global {
  interface Window {
    /**
     * TODO: add a proper type for this (AppTheme)
     */
    __theme: 'light' | 'dark';
  }
}

interface ImportMetaEnv {
  /**
   * Server only
   */
  APP_ENV: `local` | `preview` | `production`;
  ALGOLIA_ADMIN_KEY: string;
  ADMIN_PASSWORD: string;
  /**
   * Client and Server
   */
  PUBLIC_ALGOLIA_APP_ID: string;
  PUBLIC_ALGOLIA_SEARCH_KEY: string;
  PUBLIC_ALGOLIA_INDEX_NAME: string;
  PUBLIC_GOOGLE_ANALYTICS_ID: string;
}
