<script lang="ts">
  import classaNames from 'classnames';
  import { page } from '$app/stores';
  import { fly, fade } from 'svelte/transition';
  import { sideMenuStore } from '@stores/sideMenu';

  const links = [
    {
      href: '/',
      localeId: 'Home',
    },
    {
      href: '/blog',
      localeId: 'Blog',
    },
    {
      href: '/til',
      localeId: 'Today I Learned',
    },
    {
      href: '/search',
      localeId: 'Search',
    },
    {
      href: '/uses',
      localeId: 'Uses',
    },
    {
      href: '/cv',
      localeId: 'CV',
    },
    // {
    //   href: locale === 'en' ? '/rss.xml' : '/rss-pt.xml',
    //   localeId: 'sideMenu.rss',
    //   newWindow: true,
    // },
  ];

  function closeSideMenuOnScroll() {
    if ($sideMenuStore === 'open') {
      sideMenuStore.close();
    }
  }
</script>

<svelte:window on:scroll={closeSideMenuOnScroll} />

{#if $sideMenuStore === 'open'}
  <nav
    class={classaNames([
      'fixed',
      'bottom-0 right-0 top-[var(--top-menu-height)]',
      'h-full',
      'bg-white dark:bg-blue-800',
      'z-20',
      'min-w-full sm:min-w-min sm:w-full sm:max-w-xs',
      'transition-theme duration-200 ease',
    ])}
    transition:fly={{ x: 320, opacity: 1, duration: 200 }}
  >
    <ul class="py-6 flex flex-col">
      {#each links as link}
        <li class="px-4 py-2 text-center sm:text-left">
          <a
            href={link.href}
            class={classaNames([
              'cursor-pointer font-black text-xl sm:text-lg mx-5',
              $page.path === link.href &&
                `sm:pl-3 border-b-2 sm:border-l-2 sm:border-b-0 border-secondary border-opacity-80 transition-theme`,
            ])}
            on:click={closeSideMenuOnScroll}
          >
            {link.localeId}
          </a>
        </li>
      {/each}
    </ul>
  </nav>

  <div
    class="absolute inset-0 top-16 z-10 bg-[rgba(0,0,0,0.75)] pointer-events-none"
    transition:fade={{ duration: 200 }}
  />
{/if}
