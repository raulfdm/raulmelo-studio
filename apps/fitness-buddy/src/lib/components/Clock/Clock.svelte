<script lang="ts">
  import { trainingService } from '$lib/stores/trainingMachine';

  $: currentClock = $trainingService.context.currentClock;
  $: ctx = currentClock.state.context;
  $: test = currentClock.state.value;

  // export let clockRef: InterpreterFrom<ClockMachineType>;
  // const { getCurrentClock } = useTrainingMachine();
  // console.log($state.context.currentClock);
  // console.log(getCurrentClock());

  // const state = useSelector(clockRef, (state) => state);

  function click() {
    currentClock.send('START');
  }
</script>

<h1>
  <!-- {currentClock.} -->
</h1>

<pre>
  <code>
    {test}
    {JSON.stringify(currentClock.state, null, 2)}
    {JSON.stringify(ctx, null, 2)}
  </code>
</pre>

<button on:click={click}> SUM </button>
