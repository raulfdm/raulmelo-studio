import { useEffect, useState } from 'react';

import { themeBackgroundColor } from '@styles/globals';
import { SupportedThemes } from '@types-app';

function setMetaTheme(theme: SupportedThemes): void {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', themeBackgroundColor[theme]);
}

export function useThemeHandler(initialTheme?: SupportedThemes) {
  const [currentTheme, setCurrentTheme] = useState<SupportedThemes>(
    initialTheme || 'light',
  );

  useEffect(() => {
    setCurrentTheme(window.__theme);
    setMetaTheme(window.__theme);
    window.__onThemeChange = () => setCurrentTheme(window.__theme);
  }, []);

  useEffect(() => {
    if (initialTheme) {
      toggleTheme({ theme: initialTheme });
    }
  }, [initialTheme]);

  function toggleTheme(opts?: { theme: SupportedThemes }): void {
    const nextTheme =
      opts?.theme || (currentTheme === 'dark' ? 'light' : 'dark');

    setMetaTheme(nextTheme);
    window.__setPreferredTheme(nextTheme);
  }

  return {
    currentTheme,
    toggleTheme,
  };
}
