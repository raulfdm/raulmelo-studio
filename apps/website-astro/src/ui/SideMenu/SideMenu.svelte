<script lang="ts">
  import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
  import { sideMenuStore } from '@/infrastructure/stores/sideMenu';
  import { type SupportedLanguages } from '@raulmelo/core/config';
  import { Disclosure, DisclosurePanel } from '@rgossiaux/svelte-headlessui';
  import classNames from 'classnames';
  import { useSideMenuLinks } from './links';

  import SideMenuList from './SideMenuList.svelte';
  import SideMenuListItem from './SideMenuListItem.svelte';

  export let lang: SupportedLanguages;

  const links = useSideMenuLinks(lang);
  const intl = getIntl(lang);
</script>

<Disclosure>
  {#if $sideMenuStore === true}
    <DisclosurePanel
      static
      as="nav"
      class={classNames([
        'absolute bottom-0 right-0 z-20',
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

    <DisclosurePanel
      static
      as="div"
      class="absolute inset-0 z-10 pointer-events-none bg-gray-900/80 top-16"
    />
  {/if}
</Disclosure>
