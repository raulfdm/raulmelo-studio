<script lang="ts">
  export let date: Date;
  export let isActive: boolean = false;
  export let onClick: () => void;

  const convertedDate = new Date(date);

  const dateMap = {
    0: 'Dom',
    1: 'Seg',
    2: 'Ter',
    3: 'Qua',
    4: 'Qui',
    5: 'Sex',
    6: 'Sáb',
  };
</script>

<button
  class="flex flex-col items-center px-3 py-1"
  on:click={onClick}
  class:active={isActive}
>
  <span class="font-black font-heading">{convertedDate.getDate()}</span>
  <span>{dateMap[convertedDate.getDay()]}</span>
</button>

<style lang="postcss">
  button {
  }
  .active {
    @apply bg-pink-500 text-white shadow-md;
  }
</style>
