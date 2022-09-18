<script lang="ts">
  import utcPlugin from 'dayjs/plugin/utc';
  import timezonePlugin from 'dayjs/plugin/timezone';
  import dayjs from 'dayjs';
  import { Timezones } from '$lib/utils/timezones';

  dayjs.extend(utcPlugin);
  dayjs.extend(timezonePlugin);

  let baseTime = dayjs(new Date()).format('YYYY-MM-DDTHH:mm');
  const timezones = Object.keys(Timezones);
  let selectedTimezone = timezones[0];

  let finalTime = '';

  function selectTimezone(event: Event) {
    selectedTimezone = (event.target as HTMLInputElement).value;
    if (selectedTimezone) {
      finalTime = dayjs(baseTime)
        .tz(selectedTimezone)
        .format('DD MMM YYYY HH:mm');
    } else {
      finalTime = '';
    }
  }
</script>

<h2 class="my-6 text-2xl font-bold">Timezones</h2>

<div class="flex gap-2">
  <label for="time" class="text-lg font-bold">Base Time</label>
  <input id="time" type="datetime-local" bind:value={baseTime} />
</div>

<div class="flex gap-2">
  <label for="timezone" class="text-lg font-bold">TimeZone</label>
  <input
    list="timezones"
    type="text"
    name="timezone"
    id="timezone"
    class="px-2"
    on:change={selectTimezone}
  />
  <datalist id="timezones">
    {#each timezones as timezone}
      <option value={timezone}>{timezone}</option>
    {/each}
  </datalist>
</div>

<hr class="my-4 border-black border-dashed" />

<span>
  <span class="font-bold">Time there is:</span>
  {#if finalTime}
    <span>{finalTime}</span>
  {/if}
</span>
