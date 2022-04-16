<script lang="ts">
  import BeepAudio from '$lib/components/BeepAudio.svelte';
  import BottomBar from '$lib/components/BottomBar.svelte';
  import TopBar from '$lib/components/TopBar.svelte';
  import '../app.css';
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
  <link
    href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light+Two&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main class="container relative flex flex-col h-full mx-auto">
  <TopBar />
  <div class="flex-1 p-4 overflow-scroll">
    <slot />
  </div>
  <BottomBar />
  <BeepAudio />
</main>

<style lang="postcss">
  :global(html),
  :global(body) {
    height: 100%;
  }
</style>
