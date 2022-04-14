<script lang="ts">
  import PlayIcon from '$lib/components/Icons/PlayIcon.svelte';
  import PauseIcon from '$lib/components/Icons/PauseIcon.svelte';

  import {
    activityActions,
    activityStore,
    canFastForward,
    canRewind,
  } from '../activityStore';
  import { secondsToMinutes } from '$lib/utils/secondsToMinutes';
  import FastForwardIcon from '$lib/components/Icons/FastForwardIcon.svelte';
  import RewindIcon from '$lib/components/Icons/RewindIcon.svelte';

  $: currentClock = $activityStore.currentTraining.clock;
</script>

<div class="info">
  <section>
    <h3>Series</h3>
    <span>{currentClock.seriesDone}/{currentClock.totalSeries}</span>
  </section>

  <section>
    <h3>Time left</h3>
    <span>{secondsToMinutes(currentClock.remainingTime)}</span>
  </section>
</div>

<div class="actions">
  <button
    class="action"
    disabled={!$canRewind}
    on:click={activityActions.rewindSeries}
  >
    <RewindIcon size="60" />
  </button>

  <button class="action start" on:click={activityActions.toggleClock}>
    {#if currentClock.state === 'pause' || currentClock.state === 'idle'}
      <PlayIcon size="80" />
    {:else}
      <PauseIcon size="80" />
    {/if}
  </button>

  <button
    class="action"
    disabled={!$canFastForward}
    on:click={activityActions.fastForwardSeries}
  >
    <FastForwardIcon size="60" />
  </button>
</div>

<style lang="postcss">
  .info {
    @apply space-y-4;
  }
  h3 {
    @apply text-center text-lg font-bold mb-2;
  }

  span {
    @apply text-center font-bold mb-2 text-6xl block text-gray-500;
    font-variant-numeric: tabular-nums;
  }
  .actions {
    @apply mt-14 w-full grid grid-flow-col;
  }

  .action {
    @apply text-blue-400;
    @apply justify-self-center;
  }

  .action:disabled {
    @apply opacity-50;
  }

  .start {
    @apply text-pink-600;
  }
</style>
