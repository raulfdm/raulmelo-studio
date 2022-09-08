<script lang="ts">
  export let label: string;
  export let id: string;
  export let value: number;
  export let onChange: (value: number) => void;

  function internalOnInput(event: Event) {
    onChange((event.target as HTMLInputElement).valueAsNumber || 0);
  }

  function onIncreaseClick() {
    onChange(value + 1);
  }

  function onDecreaseClick() {
    const nextValue = value - 1;

    if (nextValue >= 0) {
      onChange(value - 1);
    }
  }
</script>

<fieldset>
  <label for={id}>{label}</label>
  <div class="flex items-center w-full gap-4">
    <button class="action" on:click={onDecreaseClick}>-</button>
    <input
      type="number"
      {id}
      {value}
      on:input={internalOnInput}
      class="flex-1"
    />
    <button class="action" on:click={onIncreaseClick}>+</button>
  </div>
</fieldset>

<style>
  fieldset {
    @apply flex flex-col;
  }

  fieldset input {
    @apply border border-gray-300 rounded-md px-3 py-1.5;
  }

  .action {
    @apply bg-gray-300 w-8 h-8 rounded-full;
  }
</style>
