<script lang="ts">
  import MenuClosedIcon from '$lib/components/Icons/MenuClosedIcon.svelte';
  import { sideNavService } from '$lib/stores/sideNav';
</script>

<header class="flex items-center px-4 header">
  <h2 class="flex-1 text-3xl text-center font-title">My Fitness Buddy</h2>
  <button
    class="grid w-8 h-8 place-items-center"
    on:click={() => sideNavService.send({ type: 'TOGGLE' })}
  >
    <MenuClosedIcon size="24" />
  </button>
</header>

<style lang="postcss" module>
  .header {
    @apply bg-pink-600;
    @apply text-white;
    @apply py-3;

    box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px,
      rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
  }
</style>
