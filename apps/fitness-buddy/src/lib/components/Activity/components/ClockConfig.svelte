<script lang="ts">
  import TrashIcon from '$lib/components/Icons/TrashIcon.svelte';

  import { activityStore, activityActions } from '../activityStore';

  const seriesPresets = [2, 3, 4, 5, 7, 10];
  const restPresets = [30, 45, 60, 120, 150];

  type InputEvent = Event & {
    currentTarget: EventTarget & HTMLInputElement;
  };

  function handleSeries(event: InputEvent) {
    const nextSeries = event.currentTarget.valueAsNumber;
    if (!isNaN(nextSeries)) {
      activityActions.onSeriesChange(nextSeries);
    }
  }
  function handleRest(event: InputEvent) {
    const nextRest = event.currentTarget.valueAsNumber;
    if (!isNaN(nextRest)) {
      activityActions.onRestTimeChange(nextRest);
    }
  }

  $: currentClock = $activityStore.currentTraining.clock;
</script>

<section>
  <h2 class="sectionTitle">Presets</h2>
  <section class="presetContainer">
    <h3 class="presetTitle">Series</h3>
    <div class="presetButtonsContainer">
      {#each seriesPresets as serie}
        <button
          class="presetButton"
          on:click={() => activityActions.onSeriesChange(serie)}>{serie}</button
        >
      {/each}
    </div>
  </section>
  <section class="presetContainer">
    <h3 class="presetTitle">Rest Time</h3>
    <div class="presetButtonsContainer">
      {#each restPresets as rest}
        <button
          class="presetButton"
          on:click={() => activityActions.onRestTimeChange(rest)}>{rest}</button
        >
      {/each}
    </div>
  </section>
</section>

<section class="customConfigContainer">
  <h2 class="sectionTitle">Custom Configuration</h2>
  <fieldset>
    <label for="series">Series:</label>
    <input
      id="series"
      type="number"
      placeholder="4"
      value={currentClock.totalSeries}
      on:input={handleSeries}
    />
  </fieldset>
  <fieldset>
    <label for="time">Rest (sec):</label>
    <input
      id="time"
      type="number"
      placeholder="30"
      value={currentClock.totalRest}
      on:input={handleRest}
    />
  </fieldset>
</section>

<section class="actions">
  <h3 class="sectionTitle">Reset Counter</h3>
  <button
    class="reset"
    on:click={() => {
      if (confirm('Are you sure you want to clear the clock?')) {
        activityActions.resetTimer();
      }
    }}
  >
    <TrashIcon size="32" />
  </button>
</section>

<style>
  .sectionTitle {
    @apply text-lg text-center font-bold mb-2;
  }

  .presetContainer {
    @apply flex flex-col;
  }

  .presetTitle {
    @apply italic;
  }

  .presetButtonsContainer {
    @apply flex my-4 space-x-4;
  }
  .presetButton {
    @apply flex items-center justify-center w-10 h-10 text-white bg-pink-600 rounded-full;
  }

  .customConfigContainer {
    @apply space-y-4 mt-4;
  }

  fieldset {
    @apply space-x-8 flex items-baseline;
  }

  label {
    min-width: 120px;
    @apply text-right;
  }

  input {
    @apply w-20 p-1 border-b bg-gray-100;
    flex-grow: 0.3;
  }

  .actions {
    @apply grid place-items-center mt-12;
  }

  .reset {
    @apply text-gray-400;
  }
</style>
