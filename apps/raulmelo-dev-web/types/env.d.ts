import { SupportedThemes } from '@types-app';

declare global {
  interface Window {
    __theme: SupportedThemes;
    __setPreferredTheme(nextTheme: SupportedThemes): void;
    __onThemeChange(nextTheme: SupportedThemes): void;
    twttr?: any;
  }
}

export {};
