<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
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
