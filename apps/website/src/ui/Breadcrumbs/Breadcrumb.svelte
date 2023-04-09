<script lang="ts">
  import { BreadcrumbType } from './types';

  export let crumb: BreadcrumbType;
</script>

<li class="flex items-center">
  {#if 'href' in crumb}
    <a href={crumb.href}>{crumb.label}</a>
  {:else}
    {crumb.label}
  {/if}
</li>

<style>
  li {
    & > a {
      &:hover {
        @apply underline;
      }
    }
    & + *:before {
      content: '';
      @apply ml-2 mr-3 block h-1.5 w-1.5 rotate-45 transform opacity-40;
      border-top: 1px solid;
      border-right: 1px solid;
      background-color: transparent;
    }
  }
</style>
