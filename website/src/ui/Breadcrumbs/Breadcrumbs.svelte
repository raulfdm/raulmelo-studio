<script lang="ts">
  import { mergeClasses } from '@/infrastructure/utils/misc';
  import Breadcrumb from './Breadcrumb.svelte';
  import type { BreadcrumbType } from './types';

  interface Props {
    crumbs: BreadcrumbType[];
    class?: string;
  }

  let { crumbs, class: className = '' }: Props = $props();
</script>

<div class={mergeClasses('py-2 col-span-full', className)}>
  <ul class="flex items-center gap-1 whitespace-nowrap min-h-min">
    {#each crumbs as crumb}
      <Breadcrumb {crumb} />
    {/each}
  </ul>
</div>
