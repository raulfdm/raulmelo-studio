<script lang="ts">
  import TabataInputField from '$lib/components/TabataInputField.svelte';
  import PlayIcon from '$lib/components/Icons/PlayIcon.svelte';
  import { tabataMachine } from '$lib/stores/tabata';
  import type { TabataClockContext } from '$lib/stores/tabata';
  import { useMachine } from '@xstate/svelte';
  import { secondsToMinutes } from '$lib/utils/secondsToMinutes';
  import { onMount } from 'svelte';
  import { createLocalStorage } from '$lib/utils/localStorage';

  const { state, send, service } = useMachine(tabataMachine);
  const localStoragePersistence =
    createLocalStorage<TabataClockContext>('tabata_clock');

  const persistedState = localStoragePersistence.read();

  if (persistedState !== null) {
    send({ type: 'FULL_CONFIG', payload: persistedState });
  }

  onMount(() => {
    const unsubscribe = service.subscribe((state) => {
      if (state.changed) {
        localStoragePersistence.write(state.context);
      }
    });

    return unsubscribe;
  });

  let totalTime: number;

  $: {
    totalTime = getTotalTime($state.context);
  }

  function addNewWorkout() {
    send('ADD_NEW_WORKOUT');
  }

  function removeWorkout(id: string) {
    send({ type: 'REMOVE_WORKOUT', workoutId: id });
  }

  function onWorkoutChange(id: string) {
    return (value: number) => {
      send({
        type: 'CHANGE_WORKOUT',
        payload: {
          workoutId: id,
          value,
        },
      });
    };
  }

  function getTotalTime(context: TabataClockContext) {
    let totalWorkoutTime = 0;

    context.workout.forEach(([_, workout]) => {
      totalWorkoutTime += workout;
    });

    const totalTime =
      (totalWorkoutTime + context.rest) * context.cycles + context.prepare;

    return totalTime;
  }
</script>

<header class="mb-4">
  <h1 class="text-2xl font-bold">Tabata Clock</h1>
</header>

<div class="flex flex-col max-w-xs gap-4 pb-16 mx-auto">
  <TabataInputField
    id="prepare"
    label="Prepare"
    value={$state.context.prepare}
    onChange={(value) =>
      send({ type: 'CHANGE_PREPARE', payload: { prepare: value } })}
  />

  <section>
    <div class="flex flex-col gap-2">
      {#each $state.context.workout as [id, workout], index (id)}
        <div class="flex flex-col w-full">
          <TabataInputField
            id={id.toString()}
            label={`Workout ${index + 1}`}
            value={workout}
            onChange={onWorkoutChange(id)}
          />
          <button
            on:click={() => removeWorkout(id)}
            class="ml-auto mt-2 text-pink-600 px-3 py-1.5">Delete</button
          >
        </div>
      {/each}
    </div>

    <button
      class="px-4 py-2 my-4 text-white bg-pink-600 rounded"
      on:click={addNewWorkout}>Add workout</button
    >
  </section>

  <TabataInputField
    id="rest"
    label="Rest"
    value={$state.context.rest}
    onChange={(value) =>
      send({ type: 'CHANGE_REST', payload: { rest: value } })}
  />

  <TabataInputField
    id="numberOfCycles"
    label="Number of Cycles"
    value={$state.context.cycles}
    onChange={(value) =>
      send({ type: 'CHANGE_CYCLES', payload: { cycles: value } })}
  />

  <TabataInputField
    id="cooldown"
    label="Cooldown"
    value={$state.context.cooldown}
    onChange={(value) =>
      send({ type: 'CHANGE_COOLDOWN', payload: { cooldown: value } })}
  />
</div>

<footer
  class="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-4 px-4 text-lg font-bold text-white rounded bg-emerald-400"
>
  <button class="flex items-center gap-2 py-4"
    >Start
    <PlayIcon size="28" />
    <span class="font-bold">
      ({secondsToMinutes(totalTime)})
    </span>
  </button>
</footer>

<style>
  footer {
    @apply bottom-4;
    right: 50%;
    left: 50%;
    width: min-content;
    transform: translate(-50%, 0);
  }
</style>
