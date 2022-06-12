<script>
  import { trainingService } from '$lib/stores/trainingMachine';
  export let trainingSheet;
  import { onMount } from 'svelte';

  const { send } = trainingService;

  onMount(() => {
    send({
      type: 'INITIALIZE',
      payload: {
        currentActiveIndex: 0,
        trainingSheet,
      },
    });
  });

  console.log(trainingService.getSnapshot());
  function handleClick() {
    send({
      type: 'CHANGE_TRAINING',
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

Current active training: {trainingService.getSnapshot().currentActiveIndex}
