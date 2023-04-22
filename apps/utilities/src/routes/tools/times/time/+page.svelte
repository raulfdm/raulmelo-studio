<script lang="ts">
  import { timeMachine } from '$lib/machines/time';
  import { useMachine } from '@xstate/svelte';
  import dayjs from 'dayjs';

  const { state, send } = useMachine(timeMachine);

  $: time = dayjs($state.context.baseTime).format('HH:mm:ss');

  function handleTimeChange(event: Event) {
    const { value } = event.target as HTMLInputElement;

    send({
      type: 'TIME_CHANGE',
      payload: value,
    });
  }

  function handleTimeToField(fieldType: 'hours' | 'minutes' | 'seconds') {
    return (event: Event) => {
      const { valueAsNumber } = event.target as HTMLInputElement;

      send({
        type: 'TIME_TO_CHANGE',
        payload: {
          fieldType,
          value: valueAsNumber,
        },
      });
    };
  }

  function selectInputContent(event: Event) {
    (event.target as HTMLInputElement).select();
  }
</script>

<h2 class="my-6 text-2xl font-bold">Time</h2>

<label class="label max-w-xs">
  <span>Base Time</span>
  <input
    class="input"
    id="time"
    type="time"
    value={time}
    on:input={handleTimeChange}
  />
</label>

<fieldset class="mt-4">
  <legend class="text-base font-bold">Type:</legend>

  <div class="flex gap-4">
    <label class="flex items-center space-x-2" for="add">
      <input
        class="radio"
        type="radio"
        id="add"
        name="type"
        value="add"
        checked={$state.context.type === 'add'}
        on:change={() =>
          send({ type: 'TYPE_CHANGE', payload: { type: 'add' } })}
      />
      <p>Add</p>
    </label>
    <label class="flex items-center space-x-2" for="subtract">
      <input
        class="radio"
        type="radio"
        id="subtract"
        name="type"
        value="subtract"
        checked={$state.context.type === 'subtract'}
        on:change={() =>
          send({ type: 'TYPE_CHANGE', payload: { type: 'subtract' } })}
      />
      <p>Subtract</p>
    </label>
  </div>
</fieldset>

<div class="mt-4">
  <legend class="text-base font-bold">Time to {$state.context.type}</legend>

  <div class="flex gap-2 max-w-lg">
    <label class="label">
      <span>Hours</span>
      <input
        class="input"
        id="hours"
        type="number"
        min="0"
        value={$state.context.hours}
        on:focus={selectInputContent}
        on:input={handleTimeToField('hours')}
      />
    </label>

    <label class="label">
      <span>Minutes</span>
      <input
        class="input"
        id="minute"
        type="number"
        min="0"
        value={$state.context.minutes}
        on:focus={selectInputContent}
        on:input={handleTimeToField('minutes')}
      />
    </label>

    <label class="label">
      <span>Seconds</span>
      <input
        class="input"
        id="seconds"
        type="number"
        min="0"
        value={$state.context.seconds}
        on:focus={selectInputContent}
        on:input={handleTimeToField('seconds')}
      />
    </label>
  </div>
</div>

<hr class="my-6 border border-t-0 border-black border-dashed" />

<div class="">
  <span class="text-lg font-bold">Time:</span>
  <span>{$state.context.result}</span>
</div>

<style>
  .splitTime {
    @apply flex flex-col;
  }

  .splitTime input {
    @apply px-2 py-1.5 border border-black w-20;
  }
</style>
