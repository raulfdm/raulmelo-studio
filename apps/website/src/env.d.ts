/// <reference types="astro/client" />

type Theme = `light` | `dark` | `system`;

declare namespace App {
  interface Locals {
    themeHint: Theme;
  }
}

interface Window {
  __theme: Theme;
  __handleLightTheme: () => void;
  __handleDarkTheme: () => void;
  __handleSystemTheme: () => void;
  __switchTheme: (nextTheme: Theme) => void;
}
