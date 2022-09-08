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

<fieldset class="grid items-end grid-flow-col grid-cols-6">
  <label for={id} class="col-span-3 mb-2 italic">{label}</label>
  <div class="flex items-center w-full col-span-3 gap-4">
    <button class="action" on:click={onDecreaseClick}>-</button>
    <input type="number" {id} {value} on:input={internalOnInput} class="w-16" />
    <button class="action" on:click={onIncreaseClick}>+</button>
  </div>
</fieldset>

<style>
  fieldset input {
    @apply border border-gray-300 rounded-md px-3 py-1.5;
  }

  .action {
    @apply bg-gray-300 w-8 h-8 rounded-full;
  }
</style>
