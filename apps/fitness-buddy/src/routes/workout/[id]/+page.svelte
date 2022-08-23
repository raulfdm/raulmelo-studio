<script lang="ts">
  import ContentTitle from '$lib/components/ContentTitle.svelte';
  import TrainingInfo from '$lib/components/old/Activity/components/TrainingInfo.svelte';
  import CardioCard from '$lib/components/CardioCard.svelte';
  import type { ITrainingRoutine } from '$lib/api';

  export let data: {
    trainingRoutine: ITrainingRoutine;
  };

  const { trainingRoutine } = data;
  const hasTraining =
    Boolean(trainingRoutine.training) && trainingRoutine.training.length > 0;
</script>

<svelte:head>
  <title>{trainingRoutine.name}</title>
</svelte:head>

<div>
  <h1 class="title">
    {trainingRoutine.name}
    {#if trainingRoutine.description}
      <span class="subtitle">{trainingRoutine.description}</span>
    {/if}
  </h1>

  <hr class="my-6" />

  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#if hasTraining}
      <ContentTitle title="Workout" />
      {#each trainingRoutine.training as training}
        <TrainingInfo {training} />
      {/each}
    {/if}

    {#if trainingRoutine?.cardio?.time}
      <ContentTitle title="Cardio" />
      <CardioCard cardioTime={trainingRoutine.cardio.time} />
    {/if}
  </div>
</div>

<style lang="postcss" module>
  .title {
    @apply text-3xl font-bold text-center;
  }

  .subtitle {
    @apply text-base font-normal text-gray-700 italic block;
  }
</style>
