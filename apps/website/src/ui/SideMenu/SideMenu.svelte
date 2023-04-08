<script lang="ts">
  import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
  import {
    sideMenuStore,
    closeSideMenu,
  } from '@/infrastructure/stores/sideMenu';
  import { type SupportedLanguages } from '@raulmelo/core/config';
  import { Disclosure, DisclosurePanel } from '@rgossiaux/svelte-headlessui';
  import classNames from 'classnames';
  import { useSideMenuLinks } from './links';

  import SideMenuList from './SideMenuList.svelte';
  import SideMenuListItem from './SideMenuListItem.svelte';
  import { timeline } from 'motion';

  export let lang: SupportedLanguages;
  export let pathname: string;

  const links = useSideMenuLinks(lang, pathname);
  const intl = getIntl(lang);

  let mainPanelEl: HTMLElement;
  let overlayEl: HTMLElement;

  sideMenuStore.subscribe(async (isOpen) => {
    if (mainPanelEl && overlayEl) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';

        timeline(
          [
            [
              overlayEl,
              {
                opacity: 0.7,
                backgroundColor: 'rgba(0, 0, 0)',
              },
            ],
            [mainPanelEl, { transform: `translate3d(0%, 0, 0)` }, { at: 0.2 }],
          ],
          {
            duration: 0.3,
          },
        );
      } else {
        document.body.style.overflow = 'auto';

        timeline(
          [
            [mainPanelEl, { transform: `translate3d(100%, 0, 0)` }],
            [
              overlayEl,
              {
                opacity: 0,
              },
              { at: 0.2 },
            ],
          ],
          {
            duration: 0.3,
          },
        );
      }
    }
  });

  function setMainPanelElement(node: HTMLElement) {
    mainPanelEl = node;
  }

  function setOverlayElement(node: HTMLElement) {
    overlayEl = node;
  }

  function handleKeyDown(
    event: KeyboardEvent & {
      currentTarget: EventTarget & Window;
    },
  ) {
    if (event.key === 'Escape') {
      closeSideMenu();
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<Disclosure>
  <DisclosurePanel
    static
    as="nav"
    open
    use={[setMainPanelElement]}
    class={classNames([
      'fixed bottom-0 right-0 z-20 h-full min-w-full duration-200 transform',
      'bg-white top-16 dark:bg-blue-800 sm:min-w-min sm:w-full sm:max-w-xs transition-theme ease',
    ])}
    style="transform: translate3d(100%, 0, 0);"
  >
    <SideMenuList>
      {#each links as link}
        <SideMenuListItem
          {...link}
          itemLabel={intl.formatMessage({ id: link.itemLabel })}
        />
      {/each}
    </SideMenuList>
  </DisclosurePanel>

  <DisclosurePanel
    static
    as="div"
    use={[setOverlayElement]}
    class={classNames('absolute inset-0 bg-[black] top-16 z-10 opacity-0', {
      'pointer-events-none': $sideMenuStore === false,
    })}
    on:click={closeSideMenu}
  />
</Disclosure>
