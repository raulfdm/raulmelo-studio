/// <reference types="@astrojs/image/client" />

declare global {
  export type Theme = `light` | `dark` | `system`;
}

interface Window {
  __theme: Theme;
  __handleLightTheme: () => void;
  __handleDarkTheme: () => void;
  __handleSystemTheme: () => void;
  __switchTheme: (nextTheme: Theme) => void;
}

export {};
