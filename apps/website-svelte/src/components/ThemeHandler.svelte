<script>
  import CloudMoonIcon from '@components/Icons/CloudMoonIcon.svelte';
  import CloudSunIcon from '@components/Icons/CloudSunIcon.svelte';
  import MenuBarButton from '@components/MenuBarButton.svelte';

  import {
    themeStore,
    toggleTheme,
    initializeThemeStore,
  } from '../stores/theme';

  initializeThemeStore();
</script>

<MenuBarButton on:click={toggleTheme}>
  {#if $themeStore === 'light'}
    <CloudMoonIcon />
  {:else}
    <CloudSunIcon />
  {/if}
</MenuBarButton>
