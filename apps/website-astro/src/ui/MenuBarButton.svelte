<script lang="ts">
  import classNames from 'classnames';

  let className = '';

  export { className as class };
</script>

<button
  on:click
  on:keydown
  on:keyup
  {...$$restProps}
  class={classNames(`flex p-2 place-content-center`, className)}
>
  <slot />
</button>
