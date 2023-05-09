<script lang="ts">
  import IconMoon from '@tabler/icons-svelte/dist/svelte/icons/IconMoon.svelte';
  import IconSun from '@tabler/icons-svelte/dist/svelte/icons/IconSun.svelte';
  import IconDeviceDesktop from '@tabler/icons-svelte/dist/svelte/icons/IconDeviceDesktop.svelte';
  import { onMount } from 'svelte';

  export let title: string;
  export let darkThemeTitle: string;
  export let lightThemeTitle: string;
  export let systemThemeTitle: string;

  let theme: Theme = 'system';

  onMount(() => {
    theme = window.__theme;
    /**
     * This custom event is dispatched by the ThemeScript.astro
     */
    window.addEventListener('themechange', changeTheme);

    return () => {
      window.removeEventListener('themechange', changeTheme);
    };
  });

  function changeTheme(
    event: CustomEvent<{
      detail: {
        theme: Theme;
      };
    }>,
  ) {
    theme = event.detail.theme;
  }
</script>

<div class="flex flex-col gap-2 mx-auto max-w-fit">
  <span class="text-center">{title}</span>
  <div class="flex gap-1">
    <button
      class:active={theme === 'light'}
      on:click={() => window.__switchTheme('light')}
      title={lightThemeTitle}
      aria-label={lightThemeTitle}
    >
      <IconSun />
    </button>
    <button
      class:active={theme === 'system'}
      on:click={() => window.__switchTheme('system')}
      title={systemThemeTitle}
      aria-label={systemThemeTitle}
    >
      <IconDeviceDesktop />
    </button>
    <button
      class:active={theme === 'dark'}
      on:click={() => window.__switchTheme('dark')}
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
