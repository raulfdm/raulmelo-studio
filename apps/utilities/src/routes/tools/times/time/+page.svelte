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

<div class="flex gap-2">
  <label for="time" class="text-lg font-bold">Base Time</label>
  <input id="time" type="time" value={time} on:input={handleTimeChange} />
</div>

<fieldset class="mt-4">
  <legend class="text-base font-bold">Type:</legend>

  <div>
    <input
      type="radio"
      id="add"
      name="type"
      value="add"
      checked={$state.context.type === 'add'}
      on:change={() => send({ type: 'TYPE_CHANGE', payload: { type: 'add' } })}
    />
    <label for="add">Add</label>
  </div>

  <div>
    <input
      type="radio"
      id="subtract"
      name="type"
      value="subtract"
      checked={$state.context.type === 'subtract'}
      on:change={() =>
        send({ type: 'TYPE_CHANGE', payload: { type: 'subtract' } })}
    />
    <label for="subtract">Subtract</label>
  </div>
</fieldset>

<div class="mt-4">
  <legend class="text-base font-bold">Time to {$state.context.type}</legend>

  <div class="flex gap-2">
    <fieldset class="splitTime">
      <label for="hours" class="text-sm font-bold">Hours</label>
      <input
        id="hours"
        type="number"
        min="0"
        value={$state.context.hours}
        on:focus={selectInputContent}
        on:input={handleTimeToField('hours')}
      />
    </fieldset>
    <fieldset class="splitTime">
      <label for="minute" class="text-sm font-bold">Minutes</label>
      <input
        id="minute"
        type="number"
        min="0"
        value={$state.context.minutes}
        on:focus={selectInputContent}
        on:input={handleTimeToField('minutes')}
      />
    </fieldset>
    <fieldset class="splitTime">
      <label for="seconds" class="text-sm font-bold">Seconds</label>
      <input
        id="seconds"
        type="number"
        min="0"
        value={$state.context.seconds}
        on:focus={selectInputContent}
        on:input={handleTimeToField('seconds')}
      />
    </fieldset>
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
