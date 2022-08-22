<script lang="ts">
  import type { ITrainingSheet } from '$lib/api';

  export let data: {
    trainingSheet: ITrainingSheet;
  };

  const { trainingSheet } = data;
</script>

<svelte:head>
  <title>Fitness Buddy</title>
</svelte:head>

<nav class="grid grid-cols-2 gap-6">
  {#each trainingSheet.schema as schema}
    <a sveltekit:prefetch href={`/workout/${schema._id}`} class="link">
      <h2 class="title">
        {schema.routine.name}
        <span v-if="routine.description" class="subtitle"
          >{schema.routine.description}</span
        >
      </h2>
    </a>
  {/each}
</nav>

<style lang="postcss" module>
  .link {
    @apply rounded;
    @apply p-6;
    @apply shadow;
    @apply space-y-2;
    @apply bg-white;
    @apply grid place-items-center;
    min-height: 120px;
  }
  .title {
    @apply text-xl font-semibold text-center;
  }
  .title .subtitle {
    @apply text-sm font-normal block;
  }
</style>
