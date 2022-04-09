<script lang="ts">
  import type { ITab } from './activityStore';
  import { activityStore, activityActions } from './activityStore';
  import Clock from './components/Clock.svelte';
  import ClockConfig from './components/ClockConfig.svelte';
  import Content from './components/Content.svelte';

  export const tabs: { value: ITab; label: string }[] = [
    {
      label: 'Clock',
      value: 'clock',
    },
    {
      label: 'Clock Configuration',
      value: 'clockConfig',
    },
    {
      label: 'Content',
      value: 'content',
    },
  ];
</script>

{#if $activityStore.state === 'open'}
  <div class="overlay" />
  <div class="bg-white wrapper">
    <button on:click={activityActions.close} class="closeButton">Close</button>
    <section>
      <nav>
        <ul class="tabs">
          {#each tabs as tab}
            <li
              class:tabActive={$activityStore.currentTabActive === tab.value}
              class="tab"
            >
              <button on:click={() => activityActions.setCurrentTab(tab.value)}>
                {tab.label}
              </button>
            </li>
          {/each}
        </ul>
      </nav>
    </section>
    <section class="tabContent">
      {#if $activityStore.currentTabActive === 'clock'}
        <Clock />
      {:else if $activityStore.currentTabActive === 'clockConfig'}
        <ClockConfig />
      {:else if $activityStore.currentTabActive === 'content'}
        <Content />
      {/if}
    </section>
  </div>
{/if}

<style lang="postcss">
  .overlay {
    @apply absolute top-0 bottom-0 right-0 left-0;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .wrapper {
    @apply absolute bottom-0 right-0 left-0;
    @apply bg-gray-100;
    @apply rounded-t-2xl p-4;
    min-height: 80vh;
    @apply flex flex-col;
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
  }

  .tab button {
    @apply p-3 w-full;
  }

  .tabActive {
    @apply border-b-2 border-pink-600;
  }

  .tabContent {
    @apply py-3 flex-1;
  }
</style>
