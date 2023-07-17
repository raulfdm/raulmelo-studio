<script lang="ts">
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';

  import { createLocalStorage } from '$lib/utils/localStorage';

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

<h2>Backwards ⏮️</h2>

<div class="mt-4">
  <label class="label max-w-xs">
    <span>Desired time to eat</span>
    <input
      class="input"
      id="time"
      type="datetime-local"
      bind:value={backwardValue}
    />
  </label>

  <div class="table-container mt-4 max-w-xs">
    <table class="table table-hover table-compact">
      <thead>
        <tr>
          <th class="table-cell-fit">Fasting (hours)</th>
          <th class="table-cell-fit">Time to Eat</th>
        </tr>
      </thead>
      <tbody>
        {#if backwardValues.length > 0}
          {#each backwardValues as [hour, result]}
            <tr>
              <td class="table-cell-fit">{hour}</td>
              <td class="table-cell-fit">{result}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</div>
