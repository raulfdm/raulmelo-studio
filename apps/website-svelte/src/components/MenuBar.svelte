<script>
  import SiteLogo from './SiteLogo.svelte';
  import ThemeHandler from '@components/ThemeHandler.svelte';
  import SideMenuButton from '@components/SideMenuButton.svelte';
  import SideMenu from '@components/SideMenu.svelte';
</script>

<div
  class="inset-x-0 relative h-16 z-40 shadow bg-white dark:bg-blue-800 transition-theme duration-200 ease mb-8 md:mb-12"
>
  <nav class="items-center h-full grid-container">
    <a class="col-span-2" href="/">
      <SiteLogo />
    </a>
    <section
      class="flex justify-end space-x-3 col-span-2 md:col-end-9 lg:col-end-13"
    >
      <ThemeHandler />
      <SideMenuButton />
    </section>
  </nav>
</div>
<SideMenu />
