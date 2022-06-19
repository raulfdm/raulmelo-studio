<script lang="ts">
  import PageTitle from '$lib/components/PageTitle.svelte';
  import { createLocalStorage } from '$lib/utils/localStorage';
  import { onMount } from 'svelte';

  let xValue: string | null = null;
  let yValue: string | null = null;
  let result: number | null = null;
  const localStorage = createLocalStorage<[string, string]>('rule-of-three');

  onMount(() => {
    const persistedValue = localStorage.read();

    if (persistedValue !== null) {
      xValue = persistedValue[0];
      yValue = persistedValue[1];
    }
  });

  $: {
    if (xValue !== null && yValue !== null) {
      localStorage.write([xValue, yValue]);

      const parsedX = parseInt(xValue, 10);
      const parsedY = parseInt(yValue, 10);

      result = parseFloat(((parsedY * 100) / parsedX).toFixed(2));
    } else {
      result = null;
    }
  }
</script>

<PageTitle>Rule of Three</PageTitle>

<div class="content">
  <div class="row">
    <fieldset>
      <label for="xNumber">X</label>
      <input id="xNumber" type="number" bind:value={xValue} />
    </fieldset>
    <span>---</span>
    <p>100</p>
  </div>

  <div class="row">
    <fieldset>
      <label for="yNumber">Y</label>
      <input id="yNumber" class="" type="number" bind:value={yValue} />
    </fieldset>
    <span>---</span>

    <p>
      {#if result !== null}
        {result}
      {:else}
        ?
      {/if}
    </p>
  </div>
</div>

<style lang="postcss">
  .content {
    @apply flex flex-col gap-4 mx-auto mt-4;
    width: 220px;
  }

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
    @apply w-20 px-2 py-1 border;
  }

  .row p {
    @apply text-xl font-bold text-center;
    width: 60px;
  }
</style>
