import { beforeUpdate } from 'svelte';
import { browser } from '$app/env';
import { writable } from 'svelte/store';
import type { SupportedThemes } from '@types-app';

const THEME_COLOR_MAP = {
  light: 'rgb(255,255,255)',
  dark: 'rgb(15, 23, 42)',
};

const THEME_CLASS_TO_REMOVE_MAP = {
  light: 'dark',
  dark: 'light',
};

export const themeStore = writable<SupportedThemes>(null);

export const initializeThemeStore = (): void =>
  beforeUpdate(() => {
    themeStore.set(window.__theme);
  });

export function toggleTheme(): void {
  const nextTheme = window.__theme === 'light' ? 'dark' : 'light';

  themeStore.set(nextTheme);
}

themeStore.subscribe((theme: SupportedThemes) => {
  /**
   * Ensure isn't the first render and always in the browser before
   * global update
   */
  if (theme && browser) {
    removeThemeClass(THEME_CLASS_TO_REMOVE_MAP[theme]);
    handleThemeClassDOM(theme);
    saveThemeOnLocalStorage(theme);
  }
});

function removeThemeClass(theme: SupportedThemes) {
  document.documentElement.classList.remove(theme);
}

function handleThemeClassDOM(theme: SupportedThemes) {
  document.documentElement.classList.add(theme);
  window.__theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLOR_MAP[theme]);
}

function saveThemeOnLocalStorage(theme: SupportedThemes) {
  localStorage.setItem('theme', theme);
}
