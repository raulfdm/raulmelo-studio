<script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-modern.css';
  import '@skeletonlabs/skeleton/styles/all.css';
  import '../app.css';

  import {
    computePosition,
    autoUpdate,
    flip,
    shift,
    offset,
    arrow,
  } from '@floating-ui/dom';

  import { AppBar, AppShell, storePopup } from '@skeletonlabs/skeleton';
  import AppSideBar from '$lib/components/AppSideBar.svelte';

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar
      gridColumns="grid-cols-1"
      slotDefault="place-self-center"
      slotTrail="place-content-end"
      background="bg-surface-100-800-token"
      class="shadow-lg"
    >
      <h2>Damn Useful Utilities</h2>
    </AppBar>
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <AppSideBar />
  </svelte:fragment>

  <main class="p-4">
    <slot />
  </main>
</AppShell>
