<script lang="ts">
  import { trainingService } from '$lib/stores/trainingMachine';
  import { createClockMachine } from '$lib/stores/clockMachine';
  import { useMachine } from '@xstate/svelte';
  export let trainingSheet;
  import { onMount } from 'svelte';

  const { send, state } = useMachine(
    createClockMachine({ clockId: '1', totalTime: 100 }),
  );

  console.log(state);

  // const { send } = trainingService;

  // onMount(() => {
  //   send({
  //     type: 'INITIALIZE',
  //     payload: {
  //       currentActiveIndex: 0,
  //       trainingSheet,
  //     },
  //   });
  // });

  function handleClick() {
    send({
      type: '',
      payload: {
        currentActiveIndex: 1,
      },
    });
  }
</script>

<button
  on:click={handleClick}
  class="px-6 py-2 text-white bg-green-500 rounded w-min">Spaw</button
>

Current active training: {JSON.stringify($state.context)}
