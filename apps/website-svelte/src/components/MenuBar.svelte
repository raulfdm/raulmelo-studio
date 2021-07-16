<script>
  import SiteLogo from './SiteLogo.svelte';
  import ThemeHandler from '@components/ThemeHandler.svelte';
  import SideMenuButton from '@components/SideMenuButton.svelte';
  import SideMenu from '@components/SideMenu.svelte';
</script>

<div class="wrapper shadow bg-color-secondary">
  <nav>
    <a class="logo-link" href="/">
      <SiteLogo />
    </a>
    <section class="actions-wrapper">
      <ThemeHandler />
      <SideMenuButton />
    </section>
  </nav>
</div>
<SideMenu />

<style>
  .wrapper {
    height: 4rem;
    z-index: 40;
    margin-bottom: 2rem;
    position: relative;
    top: 0;
    right: 0;

    grid-column: span 2 / span 2;
  }

  .wrapper nav {
    align-items: center;
    height: 100%;
    width: 100%;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding-left: 1rem;
    padding-right: 1rem;
    gap: 1rem;
    display: grid;
    margin-left: auto;
    margin-right: auto;
  }

  .logo-link {
    grid-column: span 2 / span 2;
    display: inline-flex;
  }

  .actions-wrapper {
    grid-column: span 2 / span 2;
    display: flex;
    justify-content: flex-end;
  }

  @media (min-width: 768px) {
    .wrapper nav {
      max-width: 64rem;
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }

    .actions-wrapper {
      grid-column-end: 9;
    }
  }

  @media (min-width: 1024px) {
    .wrapper nav {
      max-width: 80rem;
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }

    .actions-wrapper {
      grid-column-end: 13;
    }
  }
</style>
