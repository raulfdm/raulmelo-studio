<script lang="ts">
  import classNames from 'classnames';

  let className = '';

  export { className as class };
</script>

<ul
  {...$$props}
  class={classNames([`flex flex-row flex-wrap text-base gap-2`, className])}
>
  <slot />
</ul>
