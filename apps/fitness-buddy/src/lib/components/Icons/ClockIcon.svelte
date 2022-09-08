<script lang="ts">
  export let size = '20px';
  export let width = size;
  export let height = size;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  {width}
  {height}
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  {...$$props}
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
  />
</svg>
