<script lang="ts">
  import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
  import {
    sideMenuStore,
    closeSideMenu,
  } from '@/infrastructure/stores/sideMenu';
  import type { SupportedLanguage } from '@raulmelo/core/intl';
  import { mergeClasses } from '@/infrastructure/utils/misc';
  import { useSideMenuLinks } from './links';

  import SideMenuListItem from './SideMenuListItem.svelte';
  import { animate } from 'motion';
  import SideMenuThemeSwitch from './SideMenuThemeSwitch.svelte';
  import { onMount } from 'svelte';

  const { lang, pathname } = $props<{
    lang: SupportedLanguage;
    pathname: string;
  }>();

  const links = useSideMenuLinks(lang, pathname);
  const intl = getIntl(lang);

  let mainPanelEl: HTMLElement;
  let overlayEl: HTMLElement;

  sideMenuStore.subscribe(async (isOpen) => {
    const baseOption = {
      duration: 0.2,
    } as const;

    if (mainPanelEl && overlayEl) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
        const sequence = [
          [
            overlayEl,
            {
              opacity: 0.7,
              backgroundColor: 'rgba(0, 0, 0)',
            },
            baseOption,
          ],
          [
            mainPanelEl,
            { transform: `translate3d(0%, 0, 0)` },
            { at: 0.2, ...baseOption },
          ],
        ];

        animate(sequence as never);
      } else {
        document.body.style.overflow = 'auto';

        const sequence = [
          [mainPanelEl, { transform: `translate3d(100%, 0, 0)` }, baseOption],
          [
            overlayEl,
            {
              opacity: 0,
            },
            { at: 0.2, ...baseOption },
          ],
        ];

        animate(sequence as never);
      }
    }
  });

  function handleKeyDown(
    event: KeyboardEvent & {
      currentTarget: EventTarget & Window;
    },
  ) {
    if (event.key === 'Escape') {
      closeSideMenu();
    }
  }

  onMount(() => {
    document.addEventListener('astro:after-swap', closeSideMenu);

    return () =>
      document.removeEventListener('astro:after-swap', closeSideMenu);
  });
</script>

<svelte:window onkeydown={handleKeyDown} />

<nav
  bind:this={mainPanelEl}
  style="transform: translate3d(100%, 0, 0);"
  class={mergeClasses([
    'fixed bottom-0 right-0 z-20 h-full min-w-full duration-200 transform',
    'bg-white top-16 dark:bg-blue-800 sm:min-w-min sm:w-full sm:max-w-xs transition-theme ease',
    'flex flex-col',
    'pt-6 pb-16',
  ])}
>
  <ul class="flex flex-col flex-1">
    {#each links as link}
      <SideMenuListItem
        {...link}
        itemLabel={intl.formatMessage({ id: link.itemLabel })}
      />
    {/each}
  </ul>
  <div class="px-4 py-2">
    <SideMenuThemeSwitch
      title={intl.formatMessage({ id: 'sideMenu.theme.title' })}
      darkThemeTitle={intl.formatMessage({ id: 'sideMenu.theme.dark' })}
      lightThemeTitle={intl.formatMessage({ id: 'sideMenu.theme.light' })}
      systemThemeTitle={intl.formatMessage({ id: 'sideMenu.theme.system' })}
    />
  </div>
</nav>

<div
  bind:this={overlayEl}
  class={mergeClasses('absolute inset-0 bg-[black] top-16 z-10 opacity-0', {
    'pointer-events-none': $sideMenuStore === false,
  })}
  onclick={closeSideMenu}
  role="presentation"
></div>
