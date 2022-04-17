<script lang="ts">
  import { onDestroy, beforeUpdate } from 'svelte';

  import PlayIcon from '$lib/components/Icons/PlayIcon.svelte';
  import PauseIcon from '$lib/components/Icons/PauseIcon.svelte';

  import { secondsToMinutes } from '$lib/utils/secondsToMinutes';
  import FastForwardIcon from '$lib/components/Icons/FastForwardIcon.svelte';
  import RewindIcon from '$lib/components/Icons/RewindIcon.svelte';
  import {
    clockMachineService,
    persistClockInfo,
    continueTimer,
    canRewind,
    canFastForward,
    readTrainingStore,
  } from '$lib/stores/clockMachine';
  import type { ClockMachineState } from '$lib/stores/clockMachine';
  import { activityStore } from '$lib/stores/activity';

  const { send, state } = clockMachineService;

  $: currentClockNew = $state.context;
  $: clockState = $state.value;
  $: isRewindButtonDisabled =
    clockState !== 'idle' || !canRewind(currentClockNew);
  $: isFastForwardButtonDisabled =
    clockState !== 'idle' || !canFastForward(currentClockNew);

  beforeUpdate(() => {
    clockMachineService.service.start();

    const persistedStore = readTrainingStore() || {};

    const persistedContext =
      persistedStore[$activityStore.currentTraining._key];

    if (persistedContext) {
      clockMachineService.send({
        type: 'SET_ACTIVITY',
        payload: persistedContext,
      });

      if (persistedContext.state === 'running') {
        clockMachineService.send({
          type: 'RUN',
        });
      }
    } else {
      clockMachineService.send({
        type: 'SET_ACTIVITY',
        payload: {
          exerciseId: $activityStore.currentTraining._key,
          totalRest: $activityStore.currentTraining.restTime,
          totalSeries: $activityStore.currentTraining.series,
        },
      });
    }
  });

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
