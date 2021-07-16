<script lang="ts">
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
    class="wrapper bg-color-secondary"
    transition:fly={{ x: 320, opacity: 1, duration: 200 }}
  >
    <ul class="list">
      {#each links as link}
        <li class="item">
          <a
            href={link.href}
            class="link"
            class:active={$page.path === link.href}
          >
            {link.localeId}
          </a>
        </li>
      {/each}
    </ul>
  </nav>

  <div class="overlay" transition:fade={{ duration: 200 }} />
{/if}

<style>
  .wrapper {
    top: var(--top-menu-height);
    bottom: 0;
    right: 0;
    left: 0;

    position: fixed;
    z-index: 20;
  }

  .list {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .item {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-align: center;
  }

  .link.active {
    border-bottom-width: 2px;
    border-color: var(--color-secondary);
    border-bottom-style: solid;

    /* : 2px solid tomato; */
  }

  .link {
    border-bottom-width: 2px;
    border-color: var(--color-secondary);
    cursor: pointer;
    font-size: 1.777rem;
    font-weight: 900;
    line-height: 1.3;
    margin-left: 1.25rem;
    margin-right: 1.25rem;
  }

  .overlay {
    background: rgba(0, 0, 0, 0.7);
    display: block;
    height: 100%;
    inset: 4rem 0px 0px;
    opacity: 1;
    pointer-events: all;
    position: absolute;
    z-index: 10;
  }

  @media screen and (min-width: 640px) {
    .wrapper {
      min-width: min-content;
      width: 100%;
      max-width: 20rem;
      left: unset;
    }

    .item {
      text-align: left;
    }

    .link {
      border-left-width: 2px;
      border-bottom-width: 0px;
      font-size: 1.333rem;
      line-height: 1.3;
    }
    .link.active {
      padding-left: 0.75rem;
      border-bottom-width: 0;
      border-left-width: 2px;
      border-left-style: solid;
    }
  }
</style>
