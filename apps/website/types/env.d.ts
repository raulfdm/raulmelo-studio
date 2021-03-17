import { SupportedThemes } from '@types-app';

declare global {
  interface Window {
    __theme: SupportedThemes;
    twttr?: any;
  }
}

export {};
