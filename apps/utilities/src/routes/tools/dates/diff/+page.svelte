<script lang="ts">
  import dayjs, { type OpUnitType } from 'dayjs';
  let startDate: string | undefined = undefined;
  let endDate: string | undefined = undefined;
  let difference: null | number = null;

  const units: {
    unit: OpUnitType;
    label: string;
  }[] = [
    { unit: 'day', label: ' Day' },
    { unit: 'week', label: ' Week' },
    { unit: 'month', label: ' Month' },
    { unit: 'year', label: ' Year' },
  ];

  let currentUnit: OpUnitType = 'day';
  let message: string | undefined = undefined;

  $: {
    if (startDate && endDate) {
      calculateDiff();
    } else {
      difference = null;
      message = undefined;
    }
  }

  function calculateDiff() {
    const startDateDayjs = dayjs(startDate);
    const endDateDayJs = dayjs(endDate);

    difference = endDateDayJs.diff(startDateDayjs, currentUnit);
    message = getMessage(difference);
  }

  function getMessage(diff: number) {
    const label = units.find((u) => u.unit === currentUnit)?.label;
    console.log({ label, currentUnit });

    const pr = new Intl.PluralRules();

    const value = pr.select(diff);

    if (value === 'one') {
      return label;
    }

    return `${label}s`;
  }
</script>

<main class="flex flex-col gap-4">
  <h2>Difference</h2>

  <div class="flex max-w-lg gap-4">
    <label class="label">
      <span>Start date</span>
      <input class="input" type="date" bind:value={startDate} />
    </label>

    <label class="label">
      <span>End date</span>
      <input class="input" type="date" bind:value={endDate} />
    </label>
  </div>

  <label class="max-w-lg label">
    <span>Unit</span>
    <select class="select" bind:value={currentUnit} on:change={calculateDiff}>
      {#each units as { unit, label }}
        <option value={unit}>{label}</option>
      {/each}
    </select>
  </label>

  <hr class="my-4" />

  {#if difference !== null}
    <p>
      The difference between those two dates is {difference}
      {message}
    </p>
  {/if}
</main>
