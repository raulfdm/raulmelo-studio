<script lang="ts">
  import { mergeClasses } from '@/infrastructure/utils/misc';

  let className = '';

  export { className as class };
</script>

<li
  {...$$props}
  class={mergeClasses('flex flex-col items-center justify-center', className)}
>
  <slot />
</li>
