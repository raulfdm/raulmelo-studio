<script lang="ts">
  import type { ITraining } from '$lib/api';

  export let training: ITraining;
  export let onClick: () => void;

  const ADVANCED_TECHNIQUES: {
    [key in NonNullable<ITraining['advancedTechnique']>]: string;
  } = {
    bi_set: 'BI-SET',
    fst_7: 'FST-7',
    gvt: 'GVT',
    rest_and_pause: `Rest 'n' Pause 3x`,
    'drop-set': `Drop-Set 3x`,
    'warm-up': 'Warm UP',
  };
</script>

<section class="w-full mb-4 cursor-pointer" on:click={onClick}>
  <h3 class="font-semibold font-heading">{training.exercise.name}</h3>
  <p class="mt-2 font-sans">
    <span>
      {training.series}x{training.repetitions}
    </span>
    {#if training.advancedTechnique}
      <span class="inline-block ml-2 text-gray-400"
        >{ADVANCED_TECHNIQUES[training.advancedTechnique]}</span
      >
    {/if}
  </p>
</section>
