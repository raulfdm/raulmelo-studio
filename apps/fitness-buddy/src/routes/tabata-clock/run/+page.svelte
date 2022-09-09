<script lang="ts">
  import { createTabataClock } from '$lib/stores/tabata-clock';
  import { secondsToMinutes } from '$lib/utils/secondsToMinutes';
  import { tabataConfigService } from '$lib/stores/tabata-config';
  import { useMachine } from '@xstate/svelte';
  import { goto } from '$app/navigation';
  import PlayIcon from '$lib/components/Icons/PlayIcon.svelte';
  import PauseIcon from '$lib/components/Icons/PauseIcon.svelte';

  if (
    $tabataConfigService.changed === false ||
    $tabataConfigService.changed === undefined
  ) {
    goto('/tabata-clock');
  }

  const machine = createTabataClock($tabataConfigService.context);
  const { state, send, service } = useMachine(machine);

  service.subscribe(async (state) => {
    if (state.done === true) {
      setTimeout(() => {
        goto('/tabata-clock');
      }, 3000);
    }

    if (state.event.type === 'NEXT_ACTION') {
      switch (state.context.currentAction.type) {
        case 'workout': {
          new Audio('/sounds/Work.ogg').play();
          break;
        }
        case 'rest': {
          new Audio('/sounds/Rest.ogg').play();
          break;
        }
        case 'final': {
          await new Audio('/sounds/SessionComplete.ogg').play();
          break;
        }
      }
    }

    if (state.event.type === 'TICK' && state.context.elapsed === 2) {
      new Audio('/sounds/Warning2.ogg').play();
    }
  });
</script>

<div
  class="absolute top-0 bottom-0 left-0 right-0 p-4 overflow-hidden clock"
  data-state={$state.context.currentAction.type}
  data-complete={$state.done}
>
  <header>
    <section class="flex">
      <h1 class="flex-1 text-5xl text-center">
        {$state.context.currentAction.label}
      </h1>
      <button on:click={() => send('TOGGLE')}>
        {#if $state.matches('running')}
          <PauseIcon size="48" />
        {:else}
          <PlayIcon size="48" />
        {/if}
      </button>
    </section>
    <span class="block text-center text-[14rem] leading-none"
      >{$state.context.elapsed}</span
    >
  </header>
  <ul class="overflow-auto h-[clamp(200px,_600px,_400px)]">
    {#each $state.context.listOfActions as action}
      <li
        class="flex items-center justify-between gap-4 px-4 py-2 text-xl border-b border-white"
      >
        <span>{action.label}</span>
        <span>{secondsToMinutes(action.duration)}</span>
      </li>
    {/each}
  </ul>
</div>

<style>
  .clock {
    @apply text-white transition-colors;
  }

  .clock[data-state='prepare'] {
    @apply bg-green-700;
  }
  .clock[data-state='workout'] {
    @apply bg-red-700;
  }
  .clock[data-state='rest'] {
    @apply bg-blue-700;
  }
  .clock[data-complete='true'] {
    @apply bg-gray-900;
  }
</style>
