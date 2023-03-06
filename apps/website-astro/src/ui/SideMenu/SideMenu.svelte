<script lang="ts">
  import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
  import {
    sideMenuStore,
    closeSideMenu,
  } from '@/infrastructure/stores/sideMenu';
  import { type SupportedLanguages } from '@raulmelo/core/config';
  import { Disclosure, DisclosurePanel } from '@rgossiaux/svelte-headlessui';
  import classNames from 'classnames';
  import { fly, fade } from 'svelte/transition';
  import { useSideMenuLinks } from './links';
  import { clickAway } from '@/infrastructure/directives/clickAway';

  import SideMenuList from './SideMenuList.svelte';
  import SideMenuListItem from './SideMenuListItem.svelte';

  export let lang: SupportedLanguages;

  const links = useSideMenuLinks(lang);
  const intl = getIntl(lang);
</script>

<Disclosure
  class={classNames([
    'absolute top-0 bottom-0 left-0 right-0',
    $sideMenuStore ? 'z-20' : '-z-20',
  ])}
>
  {#if $sideMenuStore === true}
    <div
      transition:fly={{ x: 400, opacity: 1, duration: 200 }}
      class="relative bottom-0 right-0 z-20 h-full"
    >
      <DisclosurePanel
        static
        as="nav"
        use={[clickAway]}
        on:click_away={closeSideMenu}
        class={classNames([
          'ml-auto',
          'h-full min-w-full sm:min-w-min sm:w-full sm:max-w-xs',
          'bg-white pt-16 dark:bg-blue-800',
          'transition-theme ease',
        ])}
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
    </div>

    <div transition:fade={{ duration: 200 }} class="z-10">
      <DisclosurePanel
        static
        as="div"
        class="absolute inset-0 bg-[black] pointer-events-none opacity-70 top-16"
      />
    </div>
  {/if}
</Disclosure>
