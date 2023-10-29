<script lang="ts">
  // @ts-ignore
  import IconTrash from '@tabler/icons-svelte/dist/svelte/icons/IconTrash.svelte';

  import PageLayout from '$lib/components/PageLayout.svelte';

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

<PageLayout title="Average">
  <div class="flex flex-col mt-6">
    <div class="flex flex-wrap gap-4">
      {#each numbers as number, index}
        <div
          class="input-group input-group-divider grid-cols-[1fr_auto] max-w-[140px]"
        >
          <input type="number" bind:value={number} />
          <button
            class="variant-filled-secondary"
            on:click={() => deleteNumber(index)}><IconTrash /></button
          >
        </div>
      {/each}
    </div>

    <div class="mt-4">
      <button on:click={addNumber} class="btn variant-filled">Add</button>
    </div>

    <hr class="my-4" />

    <div>
      Average ({validNumbersLength}):
      <div class="text-2xl font-bold">
        {average}
      </div>
    </div>
  </div>
</PageLayout>
