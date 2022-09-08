<script lang="ts">
  import SwordIcon from './Icons/SwordIcon.svelte';
  import ClockIcon from './Icons/ClockIcon.svelte';
  import { sideNavService } from '$lib/stores/sideNav';

  function onLinkClick() {
    sideNavService.send({ type: 'CLOSE' });
  }
</script>

{#if $sideNavService.matches('open')}
  <div
    class="absolute bottom-0 left-0 right-0 top-[60px] bg-black bg-opacity-50"
  />
  <nav
    class="absolute bottom-0 right-0 bg-white flex flex-col top-[60px] w-[clamp(80px,_80%,_150px)]"
  >
    <a data-sveltekit-prefetch href="/" class="link" on:click={onLinkClick}>
      <SwordIcon width={24} />
      Training
    </a>
    <a
      data-sveltekit-prefetch
      href="/new-training"
      class="link"
      on:click={onLinkClick}
    >
      <SwordIcon width={24} />
      NEW Training
    </a>
    <a
      data-sveltekit-prefetch
      href="/tabata-clock"
      class="link"
      on:click={onLinkClick}
    >
      <ClockIcon size="24" />
      Tabata
    </a>
  </nav>
{/if}

<style module lang="postcss">
  .link {
    @apply inline-flex items-center gap-2 p-4 text-xs;
  }

  :global(body) {
    --nav-height: 60px;
  }
</style>
