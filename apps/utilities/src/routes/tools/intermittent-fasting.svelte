<script lang="ts">
  import PageTitle from '$lib/components/PageTitle.svelte';
  import { createLocalStorage } from '$lib/utils/localStorage';
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';

  const TODAY = dayjs(new Date()).format('MMMM DD');
  let forwardValue: string | null = null;
  let forwardValues: [number, string][] = [];
  let backwardValue: string | null = null;
  let backwardValues: [number, string][] = [];

  const localStorageForward = createLocalStorage<string>(
    'intermittent-fasting__forward',
  );

  const localStorageBackward = createLocalStorage<string>(
    'intermittent-fasting__backward',
  );

  onMount(() => {
    forwardValue = localStorageForward.read();
    backwardValue = localStorageBackward.read();
  });

  $: {
    calculateForwardValues(forwardValue);
    calculateBackwardValues(backwardValue);
  }

  function calculateBackwardValues(backwardValue: string | null) {
    if (backwardValue !== null && Boolean(backwardValue.trim())) {
      localStorageBackward.write(backwardValue);

      backwardValues = Array.from(Array(4)).map((_, index) => {
        const hour = 15 + index;
        const result = dayjs(backwardValue)
          .subtract(hour, 'hours')
          .format('MMMM D, HH:mm');

        return [hour, result];
      });
    } else {
      backwardValues = [];
    }
  }

  function calculateForwardValues(forwardValue: string | null) {
    if (forwardValue !== null && Boolean(forwardValue.trim())) {
      localStorageForward.write(forwardValue);

      forwardValues = Array.from(Array(4)).map((_, index) => {
        const hour = 15 + index;
        const result = dayjs(forwardValue).add(hour, 'hours').format('HH:mm');

        return [hour, result];
      });
    } else {
      forwardValues = [];
    }
  }
</script>

<PageTitle>Intermittent Fasting ({TODAY})</PageTitle>

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

<hr class="mt-8" />

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
