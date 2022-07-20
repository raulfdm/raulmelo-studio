<script lang="ts">
  import { createClockExerciseMachine } from '$lib/machines/clockExerciseMachine';

  import { useMachine } from '@xstate/svelte';

  const exercise = {
    restTimeInSeconds: 5,
    repetitions: 3,
  };

  const clockMachine = createClockExerciseMachine(exercise);
  const { state, send } = useMachine(clockMachine);

  $: {
    console.log($state.value);
  }
</script>

<div>
  <section>
    <h3>Series</h3>
    <span>{$state.context.repetitionsComplete}/{exercise.repetitions}</span>
  </section>
  <section>
    <h3>Time Left</h3>
    <span>{$state.context.ongoing}</span>
  </section>

  <div>
    <button on:click={() => send('TOGGLE')}>Play/Pause</button>
  </div>

  <button>Reset</button>
</div>
