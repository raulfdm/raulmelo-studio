<script lang="ts">
  import PageTitle from '$lib/components/PageTitle.svelte';
  import { useMachine } from '@xstate/svelte';
  import { ruleOfThreeMachine } from '$lib/machines/ruleOfThree';
  import type { RuleOfThreeMode } from '$lib/machines/ruleOfThree';

  const { send, state } = useMachine(ruleOfThreeMachine);

  function onFieldInput(type: 'SET_Y' | 'SET_Z' | 'SET_X') {
    return (
      event: Event & {
        currentTarget: EventTarget & HTMLInputElement;
      },
    ) => {
      send({
        type,
        payload: {
          value: (event.target as HTMLInputElement).value ?? '',
        },
      });
    };
  }

  function onModeChange(event: Event) {
    send({
      type: 'CHANGE_MODE',
      payload: (event.target as HTMLInputElement).value as RuleOfThreeMode,
    });
  }
</script>

<PageTitle>Rule of Three</PageTitle>

<div class="flex flex-col max-w-xs gap-4 mx-auto mt-4">
  <div class="row">
    <fieldset class="numberFieldset">
      <label for="xNumber">X</label>
      <input
        id="xNumber"
        type="number"
        value={$state.context.x}
        on:input={onFieldInput('SET_X')}
      />
    </fieldset>
    <span>---</span>
    <p>100</p>
  </div>

  <div class="row">
    <fieldset class="numberFieldset">
      <label for="yNumber">Y</label>
      <input
        id="yNumber"
        type="number"
        value={$state.context.y}
        on:input={onFieldInput('SET_Y')}
        disabled={$state.context.mode === 'yCalculation'}
      />
    </fieldset>
    <span>---</span>

    <fieldset class="numberFieldset">
      <label for="yNumber">Z</label>
      <input
        id="yNumber"
        type="number"
        value={$state.context.z}
        on:input={onFieldInput('SET_Z')}
        disabled={$state.context.mode === 'zCalculation'}
      />
    </fieldset>
  </div>

  <fieldset class="mt-6" on:change={onModeChange}>
    <legend class="font-bold">Calculation Mode</legend>
    <div class="flex gap-6">
      <div>
        <input
          type="radio"
          id="zCalculation"
          name="calculationMode"
          value="zCalculation"
          checked={$state.context.mode === 'zCalculation'}
        />
        <label for="zCalculation">"Z" value</label>
      </div>

      <div>
        <input
          type="radio"
          id="yCalculation"
          name="calculationMode"
          value="yCalculation"
          checked={$state.context.mode === 'yCalculation'}
        />
        <label for="yCalculation">"Y" value</label>
      </div>
    </div>
  </fieldset>
</div>

<style lang="postcss">
  .row {
    @apply flex items-center gap-3 justify-between;
  }

  .numberFieldset {
    @apply flex gap-2 items-center;
  }

  .numberFieldset label {
    @apply inline-block text-2xl font-bold;
  }

  .numberFieldset input {
    @apply w-28 px-2 py-1 border;
  }

  .numberFieldset input:disabled {
    @apply bg-gray-200 cursor-not-allowed;
  }

  .row p,
  .numberFieldset {
    @apply w-32;
  }

  .row p {
    @apply text-xl font-bold text-center;
  }
</style>
