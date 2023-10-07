<script lang="ts">
  import '../app.css';

  import {
    arrow,
    autoUpdate,
    computePosition,
    flip,
    offset,
    shift,
  } from '@floating-ui/dom';
  import {
    AppBar,
    AppShell,
    Drawer,
    getDrawerStore,
    initializeStores,
    storePopup  } from '@skeletonlabs/skeleton';

  initializeStores();

  const drawerStore = getDrawerStore();

  import AppSideBar from '$lib/components/AppSideBar.svelte';

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  function drawerOpen(): void {
    drawerStore.open({});
  }

  function drawerClose(): void {
    drawerStore.close();
  }
</script>

<AppShell slotSidebarLeft="w-0 md:w-64 lg:w-96 max-w-fit" slotPageContent="p-4">
  <svelte:fragment slot="header">
    <AppBar
      slotDefault="place-self-center"
      slotTrail="place-content-end"
      background="bg-surface-100-800-token"
      class="shadow-lg"
    >
      <svelte:fragment slot="lead">
        <div class="flex items-center">
          <button class="md:hidden btn btn-sm" on:click={drawerOpen}>
            <span>
              <svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
                <rect width="100" height="20" />
                <rect y="30" width="100" height="20" />
                <rect y="60" width="100" height="20" />
              </svg>
            </span>
          </button>
          <h2>Damn Useful Utilities</h2>
        </div>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <Drawer>
      <AppSideBar onSideMenuItemClick={drawerClose} />
    </Drawer>
    <AppSideBar onSideMenuItemClick={drawerClose} />
  </svelte:fragment>

  <slot />
</AppShell>
