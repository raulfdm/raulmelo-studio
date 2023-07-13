<script lang="ts">
  import { mergeClasses } from '@/infrastructure/utils/misc';

  let className = '';

  export { className as class };
</script>

<ul
  {...$$props}
  class={mergeClasses([`flex flex-row flex-wrap text-base gap-2`, className])}
>
  <slot />
</ul>
