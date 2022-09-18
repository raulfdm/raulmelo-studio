<script lang="ts">
  import PageTitle from '$lib/components/PageTitle.svelte';
  import { createLocalStorage } from '$lib/utils/localStorage';
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';

  let forwardValue: string | null = null;
  let forwardValues: [number, string][] = [];

  const localStorageForward = createLocalStorage<string>(
    'intermittent-fasting__forward',
  );

  const localStorageBackward = createLocalStorage<string>(
    'intermittent-fasting__backward',
  );

  onMount(() => {
    forwardValue = localStorageForward.read();
  });

  $: {
    calculateForwardValues(forwardValue);
  }

  function calculateForwardValues(forwardValue: string | null) {
    if (forwardValue !== null && Boolean(forwardValue.trim())) {
      localStorageForward.write(forwardValue);

      forwardValues = Array.from(Array(3)).map((_, index) => {
        const hour = 16 + index;
        const result = dayjs(forwardValue).add(hour, 'hours').format('HH:mm');

        return [hour, result];
      });
    } else {
      forwardValues = [];
    }
  }
</script>

<section>
  <h2 class="text-2xl font-bold">Forward</h2>

  <div class="mt-4">
    <div class="flex gap-2">
      <label for="time" class="text-lg font-bold">Last mean time</label>
      <input id="time" type="datetime-local" bind:value={forwardValue} />
    </div>

    <table class="mt-4">
      <thead>
        <tr>
          <th>Fasting (hours)</th>
          <th>Time to Eat</th>
        </tr>
      </thead>
      <tbody>
        {#if forwardValues.length > 0}
          {#each forwardValues as [hour, result]}
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
