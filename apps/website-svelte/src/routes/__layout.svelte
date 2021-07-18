<script>
  import '../app.postcss';
  import MenuBar from '@components/MenuBar.svelte';
  import '../styles/globals.css';
  import '../styles/utilities.css';
</script>

<svelte:head>
  <link rel="stylesheet" href="https://use.typekit.net/rsd6fwc.css" />
  <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
</svelte:head>

<MenuBar>
  <main>
    <slot />
  </main>

  <style>
    main {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1rem;
      padding: 0 1rem;
      margin: 0 auto;
    }

    @media screen and (min-width: 768px) {
      main {
        max-width: 64rem;
        grid-template-columns: repeat(6, minmax(0, 1fr));
      }
    }

    @media screen and (min-width: 1024px) {
      main {
        max-width: 80rem;
        grid-template-columns: repeat(12, minmax(0, 1fr));
      }
    }
  </style>
</MenuBar>
<slot />
