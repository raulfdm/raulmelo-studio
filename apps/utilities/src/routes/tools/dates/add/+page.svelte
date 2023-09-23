<script lang="ts">
  import { useMachine, useSelector } from '@xstate/svelte';

  import { type AddDateInputTypes,addDateMachine } from '$lib/machines/addDate';

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

<h2>Adding</h2>

<div class="flex flex-col gap-4 mt-8 max-w-md">
  <label class="label max-w-xs">
    <span>Date</span>
    <input
      class="input"
      id="time"
      type="date"
      value={$state.context.date}
      on:input={handleChangeDate}
    />
  </label>

  <div class="flex gap-6">
    <label class="label">
      <span>Days</span>
      <input
        class="input"
        id="day"
        type="number"
        min="1"
        on:input={handleChange}
        on:focus={handleFocus('day')}
        value={$state.context.daysToAdd}
      />
    </label>

    <label class="label">
      <span>Weeks</span>
      <input
        class="input"
        id="weeks"
        type="number"
        min="1"
        on:input={handleChange}
        on:focus={handleFocus('weeks')}
        value={$state.context.weeksToAdd}
      />
    </label>

    <label class="label">
      <span>Month</span>
      <input
        class="input"
        id="month"
        type="number"
        min="1"
        on:input={handleChange}
        on:focus={handleFocus('month')}
        value={$state.context.monthsToAdd}
      />
    </label>
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
