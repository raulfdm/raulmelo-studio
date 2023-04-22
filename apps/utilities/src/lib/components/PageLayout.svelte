<script lang="ts">
  export let title: string;
</script>

<section class="mt-5">
  <h1 class="mb-4">
    {title}
  </h1>
  <slot />
</section>
