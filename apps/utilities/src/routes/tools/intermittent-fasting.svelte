<script lang="ts">
  import PageTitle from '$lib/components/PageTitle.svelte';
  import { createLocalStorage } from '$lib/utils/localStorage';
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';

  let value: string | null = null;
  let values: [number, string][] = [];
  const localStorage = createLocalStorage<string>('intermittent-fasting');

  onMount(() => {
    value = localStorage.read();
  });

  $: {
    if (value !== null && Boolean(value.trim())) {
      localStorage.write(value);

      values = Array.from(Array(4)).map((_, index) => {
        const hour = 15 + index;
        const result = dayjs(value).add(hour, 'hours').format('HH:mm');

        return [hour, result];
      });
    } else {
      values = [];
    }
  }
</script>

<PageTitle>Intermittent Fasting</PageTitle>

<div class="mt-4">
  <div class="flex gap-2">
    <label for="time" class="text-lg font-bold">Last mean time</label>
    <input id="time" type="datetime-local" bind:value />
  </div>

  <table class="mt-4">
    <thead>
      <tr>
        <th>Fasting (hours)</th>
        <th>Time to Eat</th>
      </tr>
    </thead>
    <tbody>
      {#if values.length > 0}
        {#each values as [hour, result]}
          <tr>
            <td>{hour}</td>
            <td>{result}</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

<style>
  td,
  th {
    @apply border p-2 text-center;
  }
</style>
