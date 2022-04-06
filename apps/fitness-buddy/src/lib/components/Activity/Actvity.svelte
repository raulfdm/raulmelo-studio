<script lang="ts">
  import { activityStore, activityActions, Tabs } from './activityStore';

  export const tabs: { value: Tabs; label: string }[] = [
    {
      label: 'Clock',
      value: 'clock',
    },
    {
      label: 'Clock Configuration',
      value: 'clockConfig',
    },
  ];
</script>

{#if $activityStore.state === 'open'}
  <div class="bg-white wrapper">
    <button on:click={activityActions.close} class="closeButton">Close</button>
    <section>
      <nav class="">
        <ul class="tabs">
          {#each tabs as tab}
            <li
              class:active={$activityStore.currentTabActive === tab.value}
              on:click={() => activityActions.setCurrentTab(tab.value)}
            >
              {tab.label}
            </li>
          {/each}
        </ul>
      </nav>
    </section>
  </div>
{/if}

<style lang="postcss">
  .wrapper {
    @apply absolute bottom-0 right-0 left-0;
    @apply bg-gray-100;
    @apply rounded-t-2xl p-4;
    min-height: 92vh;
  }

  .closeButton {
    @apply absolute -top-8;
    @apply px-4 py-2;
    @apply rounded-t-full;
    @apply bg-gray-100;
    @apply text-pink-600;
    right: calc(50% - 38px);
  }

  .tabs {
    @apply flex;
    @apply flex-row;
  }

  .tab {
    @apply flex-1;
    @apply text-center;
    @apply p-3;
  }

  .tabActive {
    @apply border-b-2 border-pink-600;
  }
</style>
