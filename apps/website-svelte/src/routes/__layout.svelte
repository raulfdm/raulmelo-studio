<svelte:head>
  <link rel="stylesheet" href="https://use.typekit.net/rsd6fwc.css" />
  <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
</svelte:head>

<main>
  <slot />
</main>

<style>
  :global(:root) {
    --screen-sm: 640px;
    --screen-md: 768px;
    --screen-lg: 1024px;
    --screen-xl: 1280px;
    --screen-2xl: 1536px;
  }
  main {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    padding: 0 1rem;
    margin: 0 1rem;
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
