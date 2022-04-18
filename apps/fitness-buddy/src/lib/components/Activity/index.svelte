<script lang="ts">
  import { createMachine } from 'xstate';
  import { useMachine } from '@xstate/svelte';
  import TrainingInfo from '../TrainingInfo.svelte';
  import type { ITab } from '$lib/stores/activityMachine';
  import { activityStore, activityActions } from '../../stores/activity';
  import { clockMachineService } from '$lib/stores/clockMachine';
  import { activityMachine } from '$lib/stores/activityMachine';
  import Clock from './components/Clock.svelte';
  import ClockConfig from './components/ClockConfig.svelte';
  import Content from './components/Content.svelte';
  import DropSetCalculator from './components/DropSetCalculator.svelte';

  export const tabs: { value: ITab; label: string }[] = [
    {
      label: 'Clock',
      value: 'clock',
    },
    {
      label: 'Content',
      value: 'content',
    },
    {
      label: 'Drop Set Calculator',
      value: 'drop-set-calculator',
    },
  ];

  const { state, send } = activityMachine;
  console.log($state);

  $: currentTabOpened = $state.context.currentTabOpened;
</script>

{#if $state.value === 'active'}
  <div class="overlay" />
  <div class="bg-white wrapper">
    <button on:click={() => send('CLOSE')} class="closeButton">Close</button>

    <TrainingInfo training={$state.context.training} />

    <hr class="my-2" />

    <section class="tabContent">
      {#if currentTabOpened === 'clock'}
        <Clock />
      {:else if currentTabOpened === 'content'}
        <Content />
      {:else if currentTabOpened === 'drop-set-calculator'}
        <DropSetCalculator />
      {/if}
    </section>

    <nav class="tabs">
      {#each tabs as tab}
        <button
          class="tab"
          class:tabActive={currentTabOpened === tab.value}
          on:click={() =>
            send({ type: 'CHANGE_TAB', payload: { tab: tab.value } })}
        >
          {tab.label}
        </button>
      {/each}
    </nav>
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
    height: 80vh;
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
    @apply flex flex-row;
    @apply overflow-x-auto pb-2 -m-2;
    @apply border-t;
    scrollbar-width: none;
    @apply bg-gray-100 z-10;
  }

  .tabs::-webkit-scrollbar {
    display: none;
  }

  .tab {
    @apply flex-1;
    @apply text-center font-medium text-gray-500;
    @apply p-1;
    min-width: 120px;
  }

  .tabActive {
    @apply border-t-2 border-pink-600 text-pink-600;
  }

  .tabContent {
    @apply pt-4 pb-8 flex-1 overflow-y-auto;
  }
</style>
