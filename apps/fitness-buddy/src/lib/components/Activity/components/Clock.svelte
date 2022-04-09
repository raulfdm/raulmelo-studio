<script lang="ts">
  import { activityActions, activityStore } from '../activityStore';

  $: currentClock = $activityStore.currentClock;
</script>

<div>
  <span>Repetitions: </span>
  <span
    >{currentClock.seriesDone}/{$activityStore.currentClock.totalSeries}</span
  >
</div>

<div>
  <span>Time left: </span>
  <span>{currentClock.remainingTime}</span>
</div>

<div class="actions">
  <button class="start" on:click={activityActions.toggleClock}>Start</button>
  <button class="reset">Reset</button>
</div>

<style lang="postcss">
  .actions {
    @apply space-x-4 mt-4;
  }
  button {
    @apply px-4 py-2  rounded-md;
  }
  .start {
    @apply bg-green-500 text-white;
  }
  .reset {
    @apply text-red-600;
  }
</style>
