<script lang="ts">
  import classNames from 'classnames';
  import Breadcrumb from './Breadcrumb.svelte';
  import { type BreadcrumbType } from './types';

  export let crumbs: BreadcrumbType[];
  let className = '';

  export { className as class };
</script>

<div class={classNames('py-2', className)}>
  <ul class="flex items-center whitespace-nowrap min-h-min">
    {#each crumbs as crumb}
      <Breadcrumb {crumb} />
    {/each}
  </ul>
</div>
