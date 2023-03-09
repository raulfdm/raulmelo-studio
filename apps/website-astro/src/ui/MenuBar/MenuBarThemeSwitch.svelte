<script lang="ts">
  import { onMount } from 'svelte';
  import { IconMoon, IconSun } from '@tabler/icons-svelte';
  import MenuBarButton from './MenuBarButton.svelte';

  let theme = 'light';
  $: nextTheme = theme === 'light' ? 'dark' : 'light';

  /**
   * Bit flaky but it's working for now.
   */
  onMount(() => {
    theme = (localStorage.getItem(`theme`) as 'light' | 'dark') ?? 'light';
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

<MenuBarButton on:click={handleClick} data-testid="theme-switch">
  {#if theme === 'light'}
    <IconMoon class="w-6" />
  {:else}
    <IconSun class="w-6" />
  {/if}
</MenuBarButton>
