<script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
  import '@skeletonlabs/skeleton/styles/all.css';
  import '../app.css';

  import { AppShell } from '@skeletonlabs/skeleton';
  import AppSideBar from '$lib/components/AppSideBar.svelte';
</script>

<AppShell>
  <svelte:fragment slot="sidebarLeft">
    <AppSideBar />
  </svelte:fragment>

  <slot />
</AppShell>
