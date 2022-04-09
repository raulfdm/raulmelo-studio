<script lang="ts">
  import { activityStore, activityActions } from '../activityStore';

  function handleSeries(
    event: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    },
  ) {
    const nextSeries = event.currentTarget.valueAsNumber;
    if (!isNaN(nextSeries)) {
      activityActions.onSeriesChange(nextSeries);
    }
  }
</script>

<section>
  <h2 class="sectionTitle">Presets</h2>
  <section class="presetContainer">
    <h3 class="presetTitle">Series</h3>
    <div class="presetButtonsContainer">
      <button class="presetButton">2</button>
      <button class="presetButton">3</button>
      <button class="presetButton">4</button>
      <button class="presetButton">7</button>
      <button class="presetButton">10</button>
    </div>
  </section>
  <section class="presetContainer">
    <h3 class="presetTitle">Rest Time</h3>
    <div class="presetButtonsContainer">
      <button class="presetButton">30</button>
      <button class="presetButton">45</button>
      <button class="presetButton">60</button>
      <button class="presetButton">150</button>
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
      value={$activityStore.currentClock.totalSeries}
      on:input={handleSeries}
    />
  </fieldset>
  <fieldset>
    <label for="time">Rest (sec):</label>
    <input
      id="time"
      type="number"
      placeholder="30"
      value={$activityStore.currentTraining.restTime}
    />
  </fieldset>
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
</style>
