<script lang="ts">
  import { mergeClasses } from '@/infrastructure/utils/misc';
  import type { BreadcrumbType } from './types';

  interface Props {
    crumb: BreadcrumbType;
  }

  let { crumb }: Props = $props();

  const isLink = 'href' in crumb;
</script>

<li
  class={mergeClasses(
    'flex items-center',
    !isLink && 'truncate text-ellipsis overflow-hidden',
    'has-[a]:hover:underline',
  )}
>
  {#if 'href' in crumb}
    <a href={crumb.href}>{crumb.label}</a>
  {:else}
    <span class="font-semibold truncate text-ellipsis" title={crumb.label}>
      {crumb.label}
    </span>
  {/if}
</li>

<style>
  li:before {
    content: '';
    @apply ml-2 mr-3 block h-1.5 w-1.5 rotate-45 transform opacity-40;
    border-top: 1px solid;
    border-right: 1px solid;
    background-color: transparent;
  }
</style>
