<script>
  import classNames from 'classnames';
  export let className = '';
</script>

<ul class={classNames('flex flex-row flex-wrap text-base', className)}>
  <slot />
</ul>
