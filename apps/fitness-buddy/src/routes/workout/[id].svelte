<script lang="ts">
  import ContentTitle from '$lib/components/ContentTitle.svelte';
  import TrainingInfo from '$lib/components/TrainingInfo.svelte';
  import CardioCard from '$lib/components/CardioCard.svelte';
  import type { ITrainingRoutine } from '$lib/api';
  import Actvity from '$lib/components/Activity/Actvity.svelte';

  export let trainingRoutine: ITrainingRoutine;
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
    <ContentTitle title="Workout" />

    {#each trainingRoutine.training as training}
      <TrainingInfo {training} />
    {/each}

    <ContentTitle title="Cardio" />
    <CardioCard cardioTime={trainingRoutine.cardio.time} />
  </div>
</div>

<Actvity />

<style lang="postcss" module>
  .title {
    @apply text-3xl font-bold text-center;
  }

  .subtitle {
    @apply text-base font-normal text-gray-700 italic block;
  }
</style>
