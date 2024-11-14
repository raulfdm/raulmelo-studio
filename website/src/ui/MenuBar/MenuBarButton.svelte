<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import { mergeClasses } from '@/infrastructure/utils/misc';

  interface Props {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let { class: className = '', children, ...rest }: Props = $props();
</script>

<button
  onclick={bubble('click')}
  onkeydown={bubble('keydown')}
  onkeyup={bubble('keyup')}
  {...rest}
  class={mergeClasses(`flex p-2 place-content-center`, className)}
>
  {@render children?.()}
</button>
