<script lang="ts">
  import type { ITraining } from '$lib/api';

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
  console.log(training);

  const seriesName = `${training.series}x${training.repetitions}`;

  let workoutInfo = `${training.restTime}' descanso`;

  if (training.advancedTechnique) {
    const advanced = ADVANCED_TECHNIQUES[training.advancedTechnique];
    workoutInfo += ` - ${advanced}`;
  }
</script>

<div class="wrapper">
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
    @apply pb-2 space-y-2;
  }
</style>
