<script lang="ts">
  import { XIcon, MenuIcon } from 'lucide-svelte';
  import MenuButton from './MenuBarButton.svelte';

  import {
    sideMenuStore,
    toggleSideMenu,
  } from '@/infrastructure/stores/sideMenu';

  interface Props {
    ariaLabel: string;
  }

  let { ariaLabel }: Props = $props();
</script>

<MenuButton
  on:click={toggleSideMenu}
  aria-label={ariaLabel}
  data-testid="side-menu-button"
>
  {#if $sideMenuStore === false}
    <MenuIcon class="w-6" stroke="1.5" />
  {:else}
    <XIcon class="w-6" stroke="1.5" />
  {/if}
</MenuButton>
