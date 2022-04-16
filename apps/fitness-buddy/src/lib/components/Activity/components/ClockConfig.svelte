<script lang="ts">
  import TrashIcon from '$lib/components/Icons/TrashIcon.svelte';

  import { activityStore, activityActions } from '$lib/stores/activity';

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
