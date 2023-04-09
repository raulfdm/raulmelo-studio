<script lang="ts">
  import classNames from 'classnames';

  let className = '';

  export { className as class };
</script>

<li
  {...$$props}
  class={classNames('flex flex-col items-center justify-center', className)}
>
  <slot />
</li>
