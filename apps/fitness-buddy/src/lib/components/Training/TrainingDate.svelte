<script lang="ts">
  export let date: Date;
  export let isActive: boolean = false;
  export let onClick: () => void;

  const convertedDate = new Date(date);

  const dateMap = {
    0: 'Seg',
    1: 'Ter',
    2: 'Qua',
    3: 'Qui',
    4: 'Sex',
    5: 'Sáb',
    6: 'Dom',
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
