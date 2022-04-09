<script lang="ts">
  import PlayIcon from '$lib/components/Icons/PlayIcon.svelte';
  import PauseIcon from '$lib/components/Icons/PauseIcon.svelte';

  import { activityActions, activityStore } from '../activityStore';
  import TrashIcon from '$lib/components/Icons/TrashIcon.svelte';

  $: currentClock = $activityStore.currentTraining.clock;
</script>

<div class="info">
  <section>
    <h3>Repetitions</h3>
    <span>{currentClock.seriesDone}/{currentClock.totalSeries}</span>
  </section>

  <section>
    <h3>Time left</h3>
    <span>{currentClock.remainingTime}</span>
  </section>
</div>

<div class="actions">
  <button class="start" on:click={activityActions.toggleClock}>
    {#if currentClock.state === 'pause' || currentClock.state === 'idle'}
      <PlayIcon size="40" />
    {:else}
      <PauseIcon size="40" />
    {/if}
  </button>
  <button
    class="reset"
    on:click={() => {
      if (confirm('Are you sure you want to clear the clock?')) {
        activityActions.resetTimer();
      }
    }}
  >
    <TrashIcon size="32" />
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
  }
  .actions {
    @apply space-x-4 mt-4;
  }

  .start {
    @apply text-pink-600;
  }

  .reset {
    @apply text-gray-400;
  }
</style>
