<script lang="ts">
  import Title from './_Title.svelte';

  const renderers = {
    h1: Title,
  };

  export let type;

  console.log($$restProps);
</script>

<svelte:component this={renderers[type]} {...$$restProps}>
  {$$restProps.raw}
</svelte:component>
