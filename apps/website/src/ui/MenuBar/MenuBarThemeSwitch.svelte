<script lang="ts">
  import { onMount } from 'svelte';
  import IconMoon from '@tabler/icons-svelte/dist/svelte/icons/IconMoon.svelte';
  import IconSun from '@tabler/icons-svelte/dist/svelte/icons/IconSun.svelte';
  import MenuBarButton from './MenuBarButton.svelte';

  export let ariaLabel: string;
  export let themeHint: string | undefined;

  let theme = themeHint ?? 'light';
  $: nextTheme = theme === 'light' ? 'dark' : 'light';

  /**
   * Bit flaky but it's working for now.
   */
  onMount(() => {
    if (localStorage.getItem(`theme`)) {
      theme = localStorage.getItem(`theme`) as 'light' | 'dark';
    }
  });

  function handleClick() {
    theme = nextTheme;
    localStorage.setItem(`theme`, nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add(`dark`);
    } else {
      document.documentElement.classList.remove(`dark`);
    }
  }
</script>

<MenuBarButton
  on:click={handleClick}
  data-testid="theme-switch"
  aria-label={ariaLabel}
>
  {#if theme === 'light'}
    <IconMoon class="w-6" />
  {:else}
    <IconSun class="w-6" />
  {/if}
</MenuBarButton>
