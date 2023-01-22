/// <reference types="astro/client" />

declare global {
  interface Window {
    /**
     * TODO: add a proper type for this (AppTheme)
     */
    __theme: 'light' | 'dark';
  }
}

export {};
