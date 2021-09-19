<template>
  <button :class="$style.menuButton">
    <slot />
  </button>
</template>

<style lang="postcss">
.menuButton {
  @apply p-2 flex place-content-center;
}
</style>
