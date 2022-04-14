<script lang="ts">
  let times = 3;

  let result: string[] = [];
  let initialWeight: number = 10;
  let percentage: number = 0.8;
  let round: boolean = false;

  function calculate() {
    let next: number = initialWeight;
    let nextResult = [];

    for (let index = 0; index < times; index++) {
      next = parseFloat((next * percentage).toPrecision(3));

      if (round) {
        next = Math.round(next);
      }

      nextResult.push(next);
    }

    result = nextResult;
  }
</script>

<fieldset>
  <label for="initialWeight">Initial Weight:</label>
  <input type="number" id="initialWeight" bind:value={initialWeight} />
</fieldset>

<fieldset>
  <label for="percentage">Percentage:</label>
  <input type="number" id="percentage" bind:value={percentage} />
</fieldset>

<fieldset>
  <label for="round">Round:</label>
  <input type="checkbox" id="round" bind:value={round} />
</fieldset>

<fieldset>
  <label for="initialWeight">Times:</label>
  <input type="number" id="initialWeight" bind:value={times} />
</fieldset>

<button
  on:click={calculate}
  class="px-4 py-2 mt-4 font-semibold text-blue-700 bg-blue-200 rounded-lg"
  >Calculate</button
>

<hr class="my-4" />

<h2 class="resultTitle">Result</h2>

<table class="table-auto">
  <thead>
    <tr>
      <th>Order</th>
      <th>Weight(kg)</th>
    </tr>
  </thead>
  <tbody>
    {#each result as result, index}
      <tr>
        <td>{index + 1}</td>
        <td>{result}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  fieldset {
    @apply grid grid-flow-col grid-cols-6 mb-2;
    place-items: baseline;
  }

  label {
    @apply col-span-2 font-bold;
  }
  input {
    @apply col-span-4;
  }

  input {
    @apply bg-transparent p-1;
  }
  input[type='number'] {
    @apply border-b border-gray-300;
  }

  .resultTitle {
    @apply text-center font-bold text-xl my-3 text-gray-600;
  }

  table {
    @apply w-80 mx-auto;
  }
  td {
    @apply text-center border border-gray-500;
  }
</style>
