<script context="module">
  export async function load() {
    const mdsvex = await import('mdsvex/dist/browser-umd.js');

    console.log(mdsvex);

    const data = await mdsvex.compile(
      `
      # Hello World

      - Foo
      - bar
    `,
      {},
    );

    return {
      props: {
        data,
      },
    };
  }
</script>

<script lang="ts">
  export let data = {};
</script>

<main>
  {@html data.code}
</main>

<style>
  main {
    grid-column: 1 / -1;
  }
</style>
