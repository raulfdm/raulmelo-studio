import { browser } from '$app/env';
import { writable } from 'svelte/store';
import type { SupportedThemes } from '@types-app';

export const themeStore2 = writable();

const colorMap = {
  light: 'rgb(255,255,255)',
  dark: 'rgb(15, 23, 42)',
};

const themeClassToRemove = {
  light: 'dark',
  dark: 'light',
};

export const themeStore = {
  theme(): SupportedThemes {
    /**
     * We need to check if it's browser otherwise VITE will try to run this code
     * inside of the server and consequently it will throw an error.
     *
     * @see https://kit.svelte.dev/faq#integrations
     */
    if (browser) {
      return window.__theme;
    }
  },
  toggleTheme(): void {
    // debugger;

    const nextTheme = themeStore.theme() === 'light' ? 'dark' : 'light';

    removeThemeClass(themeClassToRemove[nextTheme]);
    handleThemeClassDOM(nextTheme);
    saveThemeOnLocalStorage(nextTheme);
  },
};

function removeThemeClass(theme: SupportedThemes) {
  document.documentElement.classList.remove(theme);
}

function handleThemeClassDOM(theme: SupportedThemes) {
  document.documentElement.classList.add(theme);
  window.__theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', colorMap[theme]);
}

function saveThemeOnLocalStorage(theme: SupportedThemes) {
  localStorage.setItem('theme', theme);
}
