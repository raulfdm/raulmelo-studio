<script lang="ts">
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

<h2>Forward ⏭️</h2>

<div class="mt-4">
  <label class="max-w-xs label">
    <span>Last meal time</span>
    <input
      class="input"
      id="time"
      type="datetime-local"
      bind:value={forwardValue}
    />
  </label>

  <div class="max-w-xs mt-4 table-container">
    <table class="table table-hover table-compact">
      <thead>
        <tr>
          <th class="table-cell-fit">Fasting (hours)</th>
          <th class="table-cell-fit">Time to Eat</th>
        </tr>
      </thead>
      <tbody>
        {#if forwardValues.length > 0}
          {#each forwardValues as [hour, result]}
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
