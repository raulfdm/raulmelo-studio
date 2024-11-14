<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let { ...props }: Props = $props();
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<a class="w-6 h-6 lg:w-8 lg:h-8" {...props}>
  {@render props.children?.()}
</a>
