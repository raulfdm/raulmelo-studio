<script lang="ts">
  import { IconMenu2, IconX } from '../icons';
  import MenuButton from './MenuBarButton.svelte';

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
    <IconMenu2 class="w-6" stroke={1.5} />
  {:else}
    <IconX class="w-6" stroke={1.5} />
  {/if}
</MenuButton>
