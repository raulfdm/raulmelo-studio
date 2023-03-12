<script lang="ts">
  import classNames from 'classnames';

  export let className: string;
</script>

<li
  {...$$props}
  class={classNames(
    'flex flex-col items-center justify-center mr-4',
    className,
  )}
>
  <slot />
</li>
