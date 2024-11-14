<script lang="ts">
  import { onMount } from 'svelte';
  import { LaptopIcon, SunIcon, MoonIcon } from 'lucide-svelte';

  interface Props {
    title: string;
    darkThemeTitle: string;
    lightThemeTitle: string;
    systemThemeTitle: string;
  }

  let { title, darkThemeTitle, lightThemeTitle, systemThemeTitle }: Props =
    $props();

  let theme: Theme = $state('system');

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
      onclick={() => window.__switchTheme('light')}
      title={lightThemeTitle}
      aria-label={lightThemeTitle}
    >
      <SunIcon stroke="1.5" />
    </button>
    <button
      class:active={theme === 'system'}
      onclick={() => window.__switchTheme('system')}
      title={systemThemeTitle}
      aria-label={systemThemeTitle}
    >
      <LaptopIcon stroke="1.5" />
    </button>
    <button
      class:active={theme === 'dark'}
      onclick={() => window.__switchTheme('dark')}
      title={darkThemeTitle}
      aria-label={darkThemeTitle}
    >
      <MoonIcon stroke="1.5" />
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
