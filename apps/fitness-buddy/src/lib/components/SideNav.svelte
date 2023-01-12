<script lang="ts">
  import SwordIcon from './Icons/SwordIcon.svelte';
  import ClockIcon from './Icons/ClockIcon.svelte';
  import DataBaseIcon from './Icons/DataBaseIcon.svelte';
  import { sideNavService } from '$lib/stores/sideNav';
  import { browser } from '$app/environment';
  import { body } from '$lib/utils/dom';

  let overlayEl: HTMLDivElement;

  function onLinkClick() {
    sideNavService.send({ type: 'CLOSE' });
  }

  $: {
    if (browser) {
      if ($sideNavService.matches('open')) {
        body.preventScroll();
      } else {
        body.allowScroll();
      }
    }
  }
</script>

{#if $sideNavService.matches('open')}
  <div class="fixed top-0 bottom-0 left-0 right-0 flex">
    <div
      class="w-full h-full bg-black bg-opacity-50"
      on:click={() => sideNavService.send('CLOSE')}
      bind:this={overlayEl}
    />
    <nav class="flex flex-col w-full h-full bg-white">
      <a href="/" class="link" on:click={onLinkClick}>
        <SwordIcon width={24} />
        Training
      </a>
      <a href="/new-training" class="link" on:click={onLinkClick}>
        <SwordIcon width={24} />
        NEW Training
      </a>
      <a href="/tabata-clock" class="link" on:click={onLinkClick}>
        <ClockIcon size="24" />
        Tabata
      </a>
      <a href="/db-connection" class="link" on:click={onLinkClick}>
        <DataBaseIcon size="24" />
        Conect to another Database
      </a>
      <a href="/admin" class="link" on:click={onLinkClick}> Admin </a>
    </nav>
  </div>
{/if}

<style module lang="postcss">
  .link {
    @apply inline-flex items-center gap-2 p-4 text-base;
  }

  :global(body) {
    --nav-height: 60px;
  }
</style>
