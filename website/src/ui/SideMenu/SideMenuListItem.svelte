<script lang="ts">
  import { mergeClasses } from '@/infrastructure/utils/misc';
  import type { SideMenuLink } from './links';
  import { ExternalLinkIcon } from 'lucide-svelte';

  interface Props {
    href: SideMenuLink['href'];
    itemLabel: SideMenuLink['itemLabel'];
    newWindow: SideMenuLink['newWindow'];
    prefetch: SideMenuLink['prefetch'];
    isActive: SideMenuLink['isActive'];
  }

  let { href, itemLabel, newWindow, prefetch, isActive }: Props = $props();

  const extraProps: { [key: string]: string } = $state(
    newWindow
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {},
  );

  if (prefetch) {
    extraProps['data-astro-prefetch'] = '';
  }
</script>

<li class="px-4 py-2 text-center sm:text-left">
  <a
    {href}
    class={mergeClasses([
      'relative mx-5 text-xl font-black cursor-pointer sm:text-lg',
      isActive &&
        'border-b-2 sm:pl-3 sm:border-l-2 sm:border-b-0 border-secondary border-opacity-80 transition-theme',
    ])}
    {...extraProps}
  >
    {itemLabel}
    {#if newWindow}
      <ExternalLinkIcon class="absolute top-0 w-4 -right-6" />
    {/if}
  </a>
</li>
