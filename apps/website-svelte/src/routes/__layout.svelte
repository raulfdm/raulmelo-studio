<script>
  import '@raulmelo/styles/lib/all.css';
  import MenuBar from '@components/MenuBar.svelte';
</script>

<svelte:head>
  <link rel="stylesheet" href="https://use.typekit.net/rsd6fwc.css" />
</svelte:head>

<MenuBar />
<main class="grid-container">
  <slot />
</main>
