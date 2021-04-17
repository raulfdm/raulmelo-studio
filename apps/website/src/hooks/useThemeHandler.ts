import { SupportedThemes } from '@types-app';
import { useMachine } from '@xstate/react/fsm';
import { useEffect } from 'react';
import { createMachine } from '@xstate/fsm';

/* TODO: find a way to consume this value from a single source of truth */
const colorMap = {
  light: '#FFFFFF',
  dark: 'rgb(15, 23, 42)',
};

type ToggleEvent =
  | { type: 'TOGGLE' }
  | { type: 'TURN_LIGHT' }
  | { type: 'TURN_DARK' };

function removeThemeClass(theme: SupportedThemes) {
  return () => {
    document.documentElement.classList.remove(theme);
  };
}

function setThemeClass(theme: SupportedThemes) {
  return () => {
    document.documentElement.classList.add(theme);
    window.__theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', colorMap[theme]);
  };
}

function saveThemeOnLocalStorage(theme: SupportedThemes) {
  return () => {
    localStorage.setItem('theme', theme);
  };
}

const themeMachine = createMachine<never, ToggleEvent>({
  initial: 'off',
  states: {
    off: {
      on: {
        TURN_DARK: 'dark',
        TURN_LIGHT: 'light',
      },
    },
    light: {
      entry: [
        setThemeClass('light'),
        saveThemeOnLocalStorage('light'),
        removeThemeClass('dark'),
      ],
      on: {
        TOGGLE: {
          target: 'dark',
        },
      },
    },
    dark: {
      entry: [
        setThemeClass('dark'),
        saveThemeOnLocalStorage('dark'),
        removeThemeClass('light'),
      ],
      on: {
        TOGGLE: {
          target: 'light',
        },
      },
    },
  },
});

export function useThemeHandler() {
  const [current, send] = useMachine(themeMachine);

  useEffect(() => {
    if (window) {
      const event = window.__theme === 'dark' ? 'TURN_DARK' : 'TURN_LIGHT';
      send(event);
    }
  }, []);

  return {
    currentTheme: current.value as SupportedThemes | 'off',
    toggleTheme: () => send('TOGGLE'),
  };
}
