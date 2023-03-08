<script lang="ts">
  import { IconExternalLink } from '@tabler/icons-svelte';
  import { type SideMenuLink } from './links';

  export let href: SideMenuLink['href'];
  export let itemLabel: SideMenuLink['itemLabel'];
  export let newWindow: SideMenuLink['newWindow'];
  export let prefetch: SideMenuLink['prefetch'];
  export let isActive: SideMenuLink['isActive'];

  const extraProps = newWindow
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {
        rel: '',
      };

  if (prefetch) {
    extraProps['rel'] = `prefetch ${extraProps.rel}`.trim();
  }
</script>

<li class="px-4 py-2 text-center sm:text-left">
  <a
    {href}
    class="relative mx-5 text-xl font-black cursor-pointer sm:text-lg"
    class:active={isActive}
    {...extraProps}
  >
    {itemLabel}
    {#if newWindow}
      <IconExternalLink class="absolute top-0 w-4 -right-6" />
    {/if}
  </a>
</li>

<style lang="postcss">
  .active {
    @apply border-b-2 sm:pl-3 sm:border-l-2 sm:border-b-0 border-secondary border-opacity-80 transition-theme;
  }
</style>
