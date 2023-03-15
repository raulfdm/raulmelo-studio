<script lang="ts">
  import MenuButton from './MenuBarButton.svelte';
  import IconMenu2 from '@tabler/icons-svelte/dist/svelte/icons/IconMenu2.svelte';
  import IconX from '@tabler/icons-svelte/dist/svelte/icons/IconX.svelte';
  import {
    sideMenuStore,
    toggleSideMenu,
  } from '@/infrastructure/stores/sideMenu';

  export let ariaLabel: string;
</script>

<MenuButton
  on:click={toggleSideMenu}
  aria-label={ariaLabel}
  data-testid="side-menu-button"
>
  {#if $sideMenuStore === false}
    <IconMenu2 class="w-6" />
  {:else}
    <IconX class="w-6" />
  {/if}
</MenuButton>
