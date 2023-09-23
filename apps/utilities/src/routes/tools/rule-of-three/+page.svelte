<script lang="ts">
  import { useMachine } from '@xstate/svelte';

  import PageLayout from '$lib/components/PageLayout.svelte';
  import { ruleOfThreeMachine, type RuleOfThreeMode } from '$lib/machines/ruleOfThree';

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

<PageLayout title="Rule of Three">
  <div class="flex flex-col max-w-lg gap-4 mt-4">
    <div class="row">
      <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="input-group-shim">X</div>
        <input
          id="xNumber"
          type="number"
          value={$state.context.x}
          on:input={onFieldInput('SET_X')}
        />
      </div>

      <span>-</span>
      <p class="flex-[100%]">100</p>
    </div>

    <div class="row">
      <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="input-group-shim">Y</div>
        <input
          id="yNumber"
          type="number"
          value={$state.context.y}
          on:input={onFieldInput('SET_Y')}
          disabled={$state.context.mode === 'yCalculation'}
        />
      </div>

      <span>-</span>

      <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="input-group-shim">Z</div>
        <input
          id="yNumber"
          type="number"
          value={$state.context.z}
          on:input={onFieldInput('SET_Z')}
          disabled={$state.context.mode === 'zCalculation'}
        />
      </div>
    </div>

    <fieldset class="mt-6" on:change={onModeChange}>
      <legend class="font-bold">Calculation Mode</legend>

      <div class="flex gap-6">
        <label class="flex items-center space-x-2" for="zCalculation">
          <input
            class="radio"
            type="radio"
            id="zCalculation"
            name="calculationMode"
            value="zCalculation"
            checked={$state.context.mode === 'zCalculation'}
          />
          <p>"Z" value</p>
        </label>
        <label class="flex items-center space-x-2">
          <input
            class="radio"
            type="radio"
            id="yCalculation"
            name="calculationMode"
            value="yCalculation"
            checked={$state.context.mode === 'yCalculation'}
          />
          <p>"Y" value</p>
        </label>
      </div>
    </fieldset>
  </div>
</PageLayout>

<style lang="postcss">
  .row {
    @apply flex items-center gap-3 justify-between;
  }

  input:disabled {
    @apply bg-gray-200 cursor-not-allowed;
  }

  .row p {
    @apply text-xl font-bold text-center;
  }
</style>
