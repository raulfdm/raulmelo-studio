import { useEffect } from 'react';
import { useLocalStorage } from 'react-use';

import { SupportedThemes } from '@types-app';

function setMetaTheme(theme: SupportedThemes): void {
  /* TODO: find a way to consume this value from a single source of truth */
  const colorMap = {
    light: '#FFFFFF',
    dark: 'rgb(15, 23, 42)',
  };

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', colorMap[theme]);
}

export function useThemeHandler(initialTheme?: SupportedThemes) {
  const [currentTheme, setTheme] = useLocalStorage('theme', initialTheme, {
    raw: true,
  });

  useEffect(() => {
    if (window) {
      setTheme(window.__theme);
    }
  }, []);

  function toggleTheme(theme?: SupportedThemes): void {
    const nextTheme = theme ?? currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      window.__theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      window.__theme = 'light';
    }

    setMetaTheme(nextTheme);
  }

  return {
    currentTheme,
    toggleTheme,
  };
}
