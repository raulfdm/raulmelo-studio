<script lang="ts">
  import WorkoutTitle from '$lib/components/WorkoutTitle.svelte';
  import TrainingInfo from '$lib/components/TrainingInfo.svelte';
  import type { ITrainingRoutine } from '$lib/api';

  export let trainingRoutine: ITrainingRoutine;
</script>

<div v-if="routine">
  <h1 class="title">
    {trainingRoutine.name}
    {#if trainingRoutine.description}
      <span class="subtitle">{trainingRoutine.description}</span>
    {/if}
  </h1>

  <hr class="my-6" />

  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <WorkoutTitle title="Workout" />

    {#each trainingRoutine.training as training}
      <TrainingInfo {training} />
    {/each}
    <!--
    <WorkoutCard
      v-for="(training, index) in routine.training"
      :key="training.exercise._id"
      :workout="training"
      :index="index + 1"
    />
    <WorkoutSectionInfo title="Cardio" />
    <CardioCard
      :cardio="{
        name: 'Qualquer Cardio',
        duration: routine.cardioTime,
      }"
    /> -->
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
