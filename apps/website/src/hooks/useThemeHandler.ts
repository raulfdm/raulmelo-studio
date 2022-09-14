import { AppTheme, utils } from '@raulmelo/core';
import { useMachine } from '@xstate/react';
import { createMachine } from 'xstate';

/* TODO: find a way to consume this value from a single source of truth */
const colorMap = {
  light: '#FFFFFF',
  dark: 'rgb(15, 23, 42)',
};

function removeThemeClass(theme: AppTheme) {
  return () => {
    document.documentElement.classList.remove(theme);
  };
}

function setThemeClass(theme: AppTheme) {
  return () => {
    document.documentElement.classList.add(theme);
    window.__theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', colorMap[theme]);
  };
}

function saveThemeOnLocalStorage(theme: AppTheme) {
  return () => {
    localStorage.setItem('theme', theme);
  };
}

const themeMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./useThemeHandler.typegen').Typegen0,
    initial: 'unset',
    states: {
      unset: {
        always: [
          {
            target: 'light',
            cond: 'isLight',
          },
          {
            target: 'dark',
          },
        ],
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
  },
  {
    guards: {
      isLight: () => {
        let result = true;
        /**
         * Because NEXT will run this on node first, I have to check
         * if the window is defined before checking the __theme property.
         */
        if (utils.isBrowserApiAvailable.window) {
          if (window.__theme) {
            result = window.__theme === 'light';
          }
        }

        return result;
      },
    },
  },
);

export function useThemeHandler() {
  const [state, send] = useMachine(() => themeMachine);

  return {
    currentTheme: state.value as AppTheme,
    toggleTheme: () => send('TOGGLE'),
  };
}
