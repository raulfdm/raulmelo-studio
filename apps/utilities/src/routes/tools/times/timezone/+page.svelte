<script lang="ts">
  import {
    Autocomplete,
    type AutocompleteOption,
    popup,
    type PopupSettings,
  } from '@skeletonlabs/skeleton';
  import dayjs from 'dayjs';
  import timezonePlugin from 'dayjs/plugin/timezone';
  import utcPlugin from 'dayjs/plugin/utc';

  import { Timezones } from '$lib/utils/timezones';

  dayjs.extend(utcPlugin);
  dayjs.extend(timezonePlugin);

  let baseTime = dayjs(new Date()).format('YYYY-MM-DDTHH:mm');
  const timezones = Object.keys(Timezones);

  let selectedTimezone = '';

  let finalTime = '';

  function onSelectTimezone(event: CustomEvent) {
    selectedTimezone = event.detail.label;

    if (selectedTimezone) {
      finalTime = dayjs(baseTime)
        .tz(selectedTimezone)
        .format('DD MMM YYYY HH:mm');
    } else {
      finalTime = '';
    }
  }

  const timeZoneOptions: AutocompleteOption[] = timezones.map((tz) => ({
    label: tz,
    value: tz,
    keywords: tz.split('/').join(', '),
  }));

  const popupSettings: PopupSettings = {
    event: 'focus-click',
    target: 'popupAutocomplete',
    placement: 'bottom',
  };
</script>

<h2 class="my-6">Timezones</h2>

<div class="max-w-xs">
  <label class="label" for="time">
    <span>Base Time</span>
    <input
      class="input"
      id="time"
      type="datetime-local"
      bind:value={baseTime}
    />
  </label>

  <label class="label" for="timezone">
    <span>Base Time</span>
    <input
      class="input autocomplete"
      type="search"
      name="timezone"
      bind:value={selectedTimezone}
      id="timezone"
      placeholder="Search..."
      use:popup={popupSettings}
    />
  </label>
  <div
    class="w-full max-w-sm p-4 mt-2 overflow-y-auto card max-h-48"
    data-popup="popupAutocomplete"
  >
    <Autocomplete
      duration={0}
      bind:input={selectedTimezone}
      options={timeZoneOptions}
      on:selection={onSelectTimezone}
    />
  </div>
</div>

<hr class="my-4 border-black border-dashed" />

<span>
  <span class="font-bold">Time there is:</span>
  {#if finalTime}
    <span>{finalTime}</span>
  {/if}
</span>
