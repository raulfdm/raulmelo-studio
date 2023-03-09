<script lang="ts">
  import classNames from 'classnames';

  export let className: string;
</script>

<ul
  {...$$props}
  class={classNames([`flex flex-row flex-wrap text-base`, className])}
>
  <slot />
</ul>
