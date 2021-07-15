<script>
  import CloudMoonIcon from '@components/Icons/CloudMoonIcon.svelte';
  import CloudSunIcon from '@components/Icons/CloudSunIcon.svelte';
  import MenuBarButton from '@components/MenuBarButton.svelte';

  import { browser } from '$app/env';
  import { themeStore, themeStore2 } from '../stores/theme';

  import { onMount, beforeUpdate } from 'svelte';

  beforeUpdate(() => {
    themeStore2.set(window.__theme);
    console.log('the component is about to update');
  });

  function handler() {
    console.log('HEHE');
  }

  function toggleTheme() {}
</script>

<MenuBarButton on:click={themeStore.toggleTheme}>
  {#if $themeStore2 === 'light'}
    <CloudMoonIcon />
  {:else}
    <CloudSunIcon />
  {/if}
</MenuBarButton>
