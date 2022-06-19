<script lang="ts">
  import '../app.css';
</script>

<main class="container py-4 mx-auto">
  <slot />
</main>

<style global>
  html,
  body {
    @apply h-full;
  }
</style>
