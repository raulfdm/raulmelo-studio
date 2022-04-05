<script lang="ts">
  import { activityStore, activityActions } from './activityStore';
</script>

{#if $activityStore.state === 'open'}
  <div class="wrapper">
    <button on:click={activityActions.close}>Close</button>
    <h2>Hello</h2>
  </div>
{/if}

<style lang="postcss">
  .wrapper {
    @apply absolute bottom-0 right-0 left-0;
    min-height: 93vh;
    background-color: rgba(0, 0, 0, 0.8);
  }
</style>
