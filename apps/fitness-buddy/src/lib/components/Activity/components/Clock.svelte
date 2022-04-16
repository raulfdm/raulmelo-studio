<script lang="ts">
  import { onDestroy } from 'svelte';
  import { useMachine } from '@xstate/svelte';
  import PlayIcon from '$lib/components/Icons/PlayIcon.svelte';
  import PauseIcon from '$lib/components/Icons/PauseIcon.svelte';

  import { activityStore } from '$lib/stores/activity';
  import { secondsToMinutes } from '$lib/utils/secondsToMinutes';
  import FastForwardIcon from '$lib/components/Icons/FastForwardIcon.svelte';
  import RewindIcon from '$lib/components/Icons/RewindIcon.svelte';
  import {
    createClockMachine,
    persistClockInfo,
    continueTimer,
    canRewind,
    canFastForward,
  } from '$lib/stores/clockMachine';
  import type { ClockMachineState } from '$lib/stores/clockMachine';

  const { send, state } = useMachine(
    createClockMachine({
      exerciseId: $activityStore.currentTraining._key,
      totalRest: $activityStore.currentTraining.restTime,
      totalSeries: $activityStore.currentTraining.series,
    }),
  );

  $: currentClockNew = $state.context;
  $: clockState = $state.value;
  $: isRewindButtonDisabled =
    clockState !== 'idle' || !canRewind(currentClockNew);
  $: isFastForwardButtonDisabled =
    clockState !== 'idle' || !canFastForward(currentClockNew);

  $: {
    console.log(currentClockNew);
  }

  onDestroy(() => {
    const clockContextWithState = {
      ...currentClockNew,
      state: clockState as ClockMachineState,
    };

    persistClockInfo(clockContextWithState);

    if (clockState === 'running') {
      continueTimer(clockContextWithState);
    }
  });
</script>

<div class="info">
  <section>
    <h3>Series</h3>
    <span>{currentClockNew.remainingSeries}/{currentClockNew.totalSeries}</span>
  </section>

  <section>
    <h3>Time left</h3>
    <span>{secondsToMinutes($state.context.remainingRest)}</span>
  </section>
</div>

<div class="actions">
  <button
    class="action"
    disabled={isRewindButtonDisabled}
    on:click={() => {
      send('REWIND');
    }}
  >
    <RewindIcon size="60" />
  </button>

  <button
    class="action start"
    on:click={() => {
      send('TOGGLE');
    }}
  >
    {#if clockState === 'pause' || clockState === 'idle'}
      <PlayIcon size="80" />
    {:else}
      <PauseIcon size="80" />
    {/if}
  </button>

  <button
    class="action"
    disabled={isFastForwardButtonDisabled}
    on:click={() => {
      send('FAST_FORWARD');
    }}
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
