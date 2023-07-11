<script lang="ts">
  import { mergeClasses } from '@/infrastructure/utils/misc';

  let className = '';

  export { className as class };
</script>

<button
  on:click
  on:keydown
  on:keyup
  {...$$restProps}
  class={mergeClasses(`flex p-2 place-content-center`, className)}
>
  <slot />
</button>
