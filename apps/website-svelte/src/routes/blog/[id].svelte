<script context="module" lang="ts">
  export async function load({ fetch }) {
    const response = await fetch(`/blog/${1}.json`);
    const code = await response.json();

    return {
      props: {
        code,
      },
    };
  }
</script>

<script>
  import Parser from './_Parser.svelte';
</script>

<Parser type="h1" raw="AHHH" class="foo" />
