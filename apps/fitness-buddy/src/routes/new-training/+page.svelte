<script lang="ts">
  import type { PageData } from './+page.server';

  export let data: PageData;

  import { onMount } from 'svelte';
  import LoaderSpinner from '$lib/components/LoaderSpinner.svelte';

  import TrainingDate from '$lib/components/Training/TrainingDate.svelte';
  import TrainingInfo from '$lib/components/Training/TrainingInfo.svelte';

  const { suggestedCurrentIndex, trainingSheet } = data;

  const TRAINING_PERSISTENCE_KEY = `training__currentIndex_${trainingSheet._id}`;

  $: currentIndex = null;
  $: currentRoutine =
    currentIndex !== null ? trainingSheet.schema[currentIndex].routine : null;
  $: showAnimation = true;

  onMount(() => {
    definePersistedIndex();
    setTimeout(hideAnimation, 1000);
  });

  function onTrainingClick(index: number) {
    currentIndex = index;
    localStorage.setItem(TRAINING_PERSISTENCE_KEY, currentIndex.toString());
  }

  function hideAnimation() {
    showAnimation = false;
  }

  function definePersistedIndex() {
    const persistedIndex = window.localStorage.getItem(
      TRAINING_PERSISTENCE_KEY,
    );

    if (persistedIndex) {
      currentIndex = parseInt(persistedIndex);
    } else if (suggestedCurrentIndex !== -1) {
      currentIndex = suggestedCurrentIndex;
    } else {
      currentIndex = trainingSheet.schema.length - 1;
    }
  }
</script>

<svelte:head>
  <title
    >Fitness Buddy {currentRoutine ? `- ${currentRoutine.name}` : null}</title
  >
</svelte:head>

{#if showAnimation}
  <div class="grid w-full h-full place-items-center">
    <LoaderSpinner />
  </div>
{:else}
  <nav class="flex justify-between">
    {#each trainingSheet.schema as schema, index}
      <TrainingDate
        date={schema.routine.date}
        isActive={currentIndex === index}
        onClick={() => onTrainingClick(index)}
      />
    {/each}
  </nav>

  <h1 class="mt-8 text-3xl font-bold font-heading">
    {currentRoutine.name}
    {#if currentRoutine.description}
      <span class="block font-sans text-base italic font-normal text-gray-700"
        >{currentRoutine.description}</span
      >
    {/if}
  </h1>

  <hr class="my-6" />

  {#if currentRoutine.training}
    <div>
      {#each currentRoutine.training as training}
        <TrainingInfo
          {training}
          onClick={() => {
            // TODO: implement
            console.log(training);
          }}
        />
      {/each}
    </div>
  {/if}
{/if}
