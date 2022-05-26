<script lang="ts">
  import SwordIcon from './SwordIcon.svelte';
</script>

<nav class="navbar">
  <a sveltekit:prefetch href="/" class="link">
    <SwordIcon width={24} />
    Training
  </a>
</nav>

<style module lang="postcss">
  .navbar {
    @apply bottom-0 mx-auto border-t shadow-md;
    @apply bg-white;

    min-height: var(--nav-height);
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px,
      rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
  }

  .link {
    @apply inline-flex flex-col items-center p-4 text-xs;
  }

  :global(body) {
    --nav-height: 60px;
  }
</style>
