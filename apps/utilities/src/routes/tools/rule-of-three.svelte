<script lang="ts">
  import PageTitle from '$lib/components/PageTitle.svelte';
  import { useMachine } from '@xstate/svelte';
  import { ruleOfThreeMachine } from '$lib/machines/ruleOfThree';

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
</script>

<PageTitle>Rule of Three</PageTitle>

<div class="flex flex-col max-w-xs gap-4 mx-auto mt-4">
  <div class="row">
    <fieldset>
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
    <fieldset>
      <label for="yNumber">Y</label>
      <input
        id="yNumber"
        class=""
        type="number"
        value={$state.context.y}
        on:input={onFieldInput('SET_Y')}
      />
    </fieldset>
    <span>---</span>

    <fieldset>
      <label for="yNumber">Z</label>
      <input
        id="yNumber"
        class=""
        type="number"
        value={$state.context.z}
        on:input={onFieldInput('SET_Z')}
      />
    </fieldset>
  </div>
</div>

<style lang="postcss">
  .row {
    @apply flex items-center gap-3 justify-between;
  }

  fieldset {
    @apply flex gap-2 items-center;
  }

  fieldset label {
    @apply inline-block text-2xl font-bold;
  }

  fieldset input {
    @apply w-28 px-2 py-1 border;
  }

  .row p,
  fieldset {
    @apply w-32;
  }

  .row p {
    @apply text-xl font-bold text-center;
  }
</style>
