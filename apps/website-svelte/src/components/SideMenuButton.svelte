<script>
  import MenuBarButton from '@components/MenuBarButton.svelte';
  import CloseIcon from '@components/Icons/CrossIcon.svelte';
  import OpenIcon from '@components/Icons/MenuIcon.svelte';

  import { sideMenuStore } from '@stores/sideMenu';
</script>

<MenuBarButton on:click={sideMenuStore.toggle}>
  {#if $sideMenuStore === 'open'}
    <CloseIcon />
  {:else}
    <OpenIcon />
  {/if}
</MenuBarButton>
