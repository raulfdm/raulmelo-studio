<script lang="ts">
  import { mergeClasses } from '@/infrastructure/utils/misc';
  import Breadcrumb from './Breadcrumb.svelte';
  import type { BreadcrumbType } from './types';

  export let crumbs: BreadcrumbType[];
  let className = '';

  export { className as class };
</script>

<div class={mergeClasses('py-2 col-span-full', className)}>
  <ul class="flex items-center gap-1 whitespace-nowrap min-h-min">
    {#each crumbs as crumb}
      <Breadcrumb {crumb} />
    {/each}
  </ul>
</div>
