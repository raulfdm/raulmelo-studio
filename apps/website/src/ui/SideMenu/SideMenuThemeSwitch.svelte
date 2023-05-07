<script lang="ts">
  import IconMoon from '@tabler/icons-svelte/dist/svelte/icons/IconMoon.svelte';
  import IconSun from '@tabler/icons-svelte/dist/svelte/icons/IconSun.svelte';
  import IconDeviceDesktop from '@tabler/icons-svelte/dist/svelte/icons/IconDeviceDesktop.svelte';
  import { onMount } from 'svelte';

  type Theme = 'light' | 'dark' | 'system';

  export let themeHint: string | undefined;
  export let title: string;
  export let darkThemeTitle: string;
  export let lightThemeTitle: string;
  export let systemThemeTitle: string;

  let theme: Theme = themeHint || 'system';

  if (localStorage.getItem(`theme`)) {
    theme = localStorage.getItem(`theme`) as 'light' | 'dark';
  }

  $: {
    if (typeof window !== 'undefined') {
      switch (theme) {
        case 'light':
          handleLightTheme();
          break;
        case 'dark':
          handleDarkTheme();
          break;
        case 'system':
          handleSystemTheme();
          break;
        default:
          break;
      }
    }
  }

  function handleLightTheme() {
    document.documentElement.classList.remove(`dark`);
  }

  function handleDarkTheme() {
    document.documentElement.classList.add(`dark`);
  }

  function handleSystemTheme() {
    if (typeof window !== 'undefined') {
      const darkModeMediaQuery = window.matchMedia(
        '(prefers-color-scheme: dark)',
      );

      darkModeMediaQuery?.addEventListener('change', themeLogic);

      /**
       * I have to run this to instantly apply the matched theme.
       */
      themeLogic();

      function themeLogic() {
        if (darkModeMediaQuery.matches) {
          handleDarkTheme();
        } else {
          handleLightTheme();
        }
      }
    }
  }

  function handleNextTheme(nextTheme: Theme) {
    return () => {
      theme = nextTheme;
      localStorage.setItem(`theme`, nextTheme);
    };
  }
</script>

<div class="flex flex-col gap-2 mx-auto max-w-fit">
  <span class="text-center">{title}</span>
  <div class="flex gap-1">
    <button
      class:active={theme === 'light'}
      on:click={handleNextTheme('light')}
      title={lightThemeTitle}
      aria-label={lightThemeTitle}
    >
      <IconSun />
    </button>
    <button
      class:active={theme === 'system'}
      on:click={handleNextTheme('system')}
      title={systemThemeTitle}
      aria-label={systemThemeTitle}
    >
      <IconDeviceDesktop />
    </button>
    <button
      class:active={theme === 'dark'}
      on:click={handleNextTheme('dark')}
      title={darkThemeTitle}
      aria-label={darkThemeTitle}
    >
      <IconMoon />
    </button>
  </div>
</div>

<style lang="postcss">
  button {
    @apply rounded-full p-2 border-opacity-50 text-opacity-50;

    &:hover {
      @apply bg-gray-100 dark:bg-gray-700;
    }

    &.active {
      @apply text-secondary;
    }
  }
</style>
