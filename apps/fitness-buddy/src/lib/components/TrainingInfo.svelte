<script lang="ts">
  import { onMount } from 'svelte';
  import type { ITraining } from '$lib/api';
  import { activityActions, activityStore } from '$lib/stores/activity';
  import { clockMachineService } from '$lib/stores/clockMachine';

  const ADVANCED_TECHNIQUES: {
    [key in NonNullable<ITraining['advancedTechnique']>]: string;
  } = {
    bi_set: 'BI-SET',
    fst_7: 'FST-7',
    gvt: 'GVT',
    rest_and_pause: `Rest 'n' Pause 3x`,
    'drop-set': `Drop-Set 3x`,
  };

  export let training: ITraining;

  const seriesName = `${training.series}x${training.repetitions}`;

  let workoutInfo = `${training.restTime}' descanso`;

  if (training.advancedTechnique) {
    const advanced = ADVANCED_TECHNIQUES[training.advancedTechnique];
    workoutInfo += ` - ${advanced}`;
  }

  onMount(() => {
    activityActions.addTraining(training);
  });
</script>

<div
  class="wrapper"
  on:click={() => {
    activityActions.open(training._key);
    clockMachineService.service.start();

    clockMachineService.send({
      type: 'SET_ACTIVITY',
      payload: {
        exerciseId: training._key,
        totalRest: training.restTime,
        totalSeries: training.series,
      },
    });
  }}
>
  <header class="flex">
    <h2 class="text-base font-semibold">{training.exercise.name}</h2>
  </header>

  <p class="text-sm">
    {seriesName}
    <span class="text-sm italic text-gray-600">{workoutInfo}</span>
  </p>
</div>

<style lang="postcss">
  .wrapper {
    @apply pb-2 space-y-2 cursor-pointer;
  }
</style>
