<script lang="ts">
  import TabataInputField from '$lib/components/TabataInputField.svelte';
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

<header>
  <h1>Tabata</h1>
</header>

<div class="flex flex-col max-w-lg gap-4">
  <TabataInputField
    id="prepare"
    label="Prepare"
    value={$state.context.prepare}
    onChange={(value) =>
      send({ type: 'CHANGE_PREPARE', payload: { prepare: value } })}
  />

  <section>
    <hr class="my-4" />

    <h2 class="mb-4 text-lg font-bold">Workout</h2>
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
            class="mx-auto mt-2 text-pink-600 px-3 py-1.5">Delete</button
          >
        </div>
      {/each}
    </div>

    <button
      class="px-4 py-2 my-4 text-white bg-pink-600 rounded"
      on:click={addNewWorkout}>ADD</button
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

  <hr class="my-6" />

  <TabataInputField
    id="cooldown"
    label="Cooldown"
    value={$state.context.cooldown}
    onChange={(value) =>
      send({ type: 'CHANGE_COOLDOWN', payload: { cooldown: value } })}
  />
</div>

<footer class="fixed bottom-0 left-0 right-0 px-4 bg-slate-300">
  <span>
    {secondsToMinutes(totalTime)}
  </span>
  <button class="mt-6"> Start </button>
</footer>
