<script lang="ts">
  import type { AddDateInputTypes } from '$lib/machines/addDate';
  import { addDateMachine } from '$lib/machines/addDate';
  import { useMachine, useSelector } from '@xstate/svelte';

  const { state, send, service } = useMachine(addDateMachine);

  function handleChange(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;

    send({
      type: 'CHANGE',
      value: isNaN(value) ? undefined : value,
    });
  }

  function handleChangeDate(event: Event) {
    send({
      type: 'CHANGE_DATE',
      value: (event.target as HTMLInputElement).value,
    });
  }

  const focusEventMap = {
    day: 'FOCUS_DAY',
    weeks: 'FOCUS_WEEKS',
    month: 'FOCUS_MONTH',
  } as const;

  function handleFocus(input: AddDateInputTypes) {
    return () => send({ type: focusEventMap[input] });
  }

  const label = useSelector(service, (currentState) => {
    const pr = new Intl.PluralRules();

    const pluralRules = {
      day: new Map([
        ['one', 'day'],
        ['other', 'days'],
      ]),
      weeks: new Map([
        ['one', 'week'],
        ['other', 'weeks'],
      ]),
      month: new Map([
        ['one', 'month'],
        ['other', 'months'],
      ]),
    } as const;

    let value: number | undefined;

    switch (currentState.value) {
      case 'day':
        value = currentState.context.daysToAdd;
        break;
      case 'weeks':
        value = currentState.context.weeksToAdd;
        break;
      case 'month':
        value = currentState.context.monthsToAdd;
        break;
    }

    const ruleSet = pluralRules[currentState.value as AddDateInputTypes];
    const selectedRule = value ? pr.select(value) : null;

    return selectedRule === null ? '' : `${value} ${ruleSet.get(selectedRule)}`;
  });
</script>

<h2 class="my-6 text-2xl font-bold">Adding</h2>

<div class="flex flex-col">
  <div class="flex gap-2 mb-6">
    <label for="time" class="text-lg font-bold">Date</label>
    <input
      id="time"
      type="date"
      value={$state.context.date}
      on:input={handleChangeDate}
    />
  </div>

  <div class="flex flex-wrap gap-2">
    <div class="flex gap-2">
      <label for="day" class="text-lg font-bold">Days</label>
      <input
        id="day"
        class="px-2"
        type="number"
        min="1"
        on:input={handleChange}
        on:focus={handleFocus('day')}
        value={$state.context.daysToAdd}
      />
    </div>
    <div class="flex gap-2">
      <label for="weeks" class="text-lg font-bold">Weeks</label>
      <input
        id="weeks"
        class="px-2"
        type="number"
        min="1"
        on:input={handleChange}
        on:focus={handleFocus('weeks')}
        value={$state.context.weeksToAdd}
      />
    </div>
    <div class="flex gap-2">
      <label for="month" class="text-lg font-bold">Month</label>
      <input
        id="month"
        class="px-2"
        type="number"
        min="1"
        on:input={handleChange}
        on:focus={handleFocus('month')}
        value={$state.context.monthsToAdd}
      />
    </div>
  </div>
</div>

<hr
  class="my-4 border border-t-0 border-l-0 border-r-0 border-black border-dashed"
/>

<div>
  <span class="font-bold">Future date:</span>
  {#if $state.context.nextDate !== undefined}
    <span>{$state.context.nextDate} </span>
    in {$label}
  {/if}
</div>
