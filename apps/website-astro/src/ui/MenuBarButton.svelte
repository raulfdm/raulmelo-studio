<script lang="ts">
  import classNames from 'classnames';

  export let className = '';
</script>

<button
  class={classNames(`flex p-2 place-content-center`, className)}
  on:click
  {...$$props}
>
  <slot />
</button>
