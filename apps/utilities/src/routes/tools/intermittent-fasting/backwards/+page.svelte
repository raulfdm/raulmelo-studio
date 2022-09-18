<script lang="ts">
  import { createLocalStorage } from '$lib/utils/localStorage';
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';

  let backwardValue: string | null = null;
  let backwardValues: [number, string][] = [];

  const localStorageBackward = createLocalStorage<string>(
    'intermittent-fasting__backward',
  );

  onMount(() => {
    backwardValue = localStorageBackward.read();
  });

  $: {
    calculateBackwardValues(backwardValue);
  }

  function calculateBackwardValues(backwardValue: string | null) {
    if (backwardValue !== null && Boolean(backwardValue.trim())) {
      localStorageBackward.write(backwardValue);

      backwardValues = Array.from(Array(3)).map((_, index) => {
        const hour = 16 + index;
        const result = dayjs(backwardValue)
          .subtract(hour, 'hours')
          .format('MMMM D, HH:mm');

        return [hour, result];
      });
    } else {
      backwardValues = [];
    }
  }
</script>

<section class="mt-8">
  <h2 class="text-2xl font-bold">Backwards</h2>

  <div class="mt-4">
    <div class="flex gap-2">
      <label for="time" class="text-lg font-bold">Desired time to eat</label>
      <input id="time" type="datetime-local" bind:value={backwardValue} />
    </div>

    <table class="mt-4">
      <thead>
        <tr>
          <th>Fasting (hours)</th>
          <th>Time to stop eating</th>
        </tr>
      </thead>
      <tbody>
        {#if backwardValues.length > 0}
          {#each backwardValues as [hour, result]}
            <tr>
              <td>{hour}</td>
              <td>{result}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</section>

<style>
  td,
  th {
    @apply border p-2 text-center;
  }
</style>
