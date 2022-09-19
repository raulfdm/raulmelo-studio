<script lang="ts">
  import PageTitle from '$lib/components/PageTitle.svelte';

  type Numbers = (number | null)[];

  let numbers: Numbers = [null];
  $: average = getAverage(numbers);
  $: validNumbersLength = getValidNumbersLength(numbers);

  function addNumber() {
    numbers = [...numbers, null];
  }

  function getValidNumbersLength(nums: Numbers) {
    return nums.filter((num) => num !== null).length;
  }

  function deleteNumber(index: number) {
    numbers = numbers.filter((_, i) => i !== index);
  }

  function getAverage(nums: Numbers) {
    let result = 0;
    let dividedBy = 0;

    for (const num of nums) {
      if (num === null) {
        continue;
      }

      result += num;
      dividedBy++;
    }

    if (dividedBy === 0) {
      return 0;
    }

    return (result / dividedBy).toFixed(2);
  }
</script>

<PageTitle>Average</PageTitle>

<div class="flex flex-col mt-6">
  <div class="flex flex-wrap gap-4">
    {#each numbers as number, index}
      <div>
        <input type="number" bind:value={number} class="h-8" />
        <button
          class="px-2 py-1 text-white bg-blue-600 rounded"
          on:click={() => deleteNumber(index)}>Del</button
        >
      </div>
    {/each}
  </div>

  <div class="mt-4">
    <button
      on:click={addNumber}
      class="px-4 py-2 text-pink-600 bg-pink-100 border border-pink-500 rounded"
      >Add</button
    >
  </div>

  <hr class="my-4" />

  <div class="">
    Average ({validNumbersLength}):
    <div class="text-2xl font-bold">
      {average}
    </div>
  </div>
</div>

<style>
  input {
    @apply py-0.5 px-2 border;
  }
</style>
