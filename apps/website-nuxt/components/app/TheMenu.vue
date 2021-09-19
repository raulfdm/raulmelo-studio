<template>
  <div :class="$style.wrapper">
    <nav :class="$style.inner" class="grid-container">
      <section :class="$style.logoSection">
        <nuxt-link to="/">
          <TheLogo />
        </nuxt-link>
      </section>
      <section :class="$style.iconsSection"></section>
    </nav>
  </div>
</template>

<style lang="postcss" module>
.wrapper {
  @apply inset-x-0;
  @apply relative;
  @apply h-16;
  @apply z-40;
  @apply shadow;
  @apply bg-white dark:bg-blue-800;
  @apply transition-theme duration-200 ease-in-out;
  @apply mb-8 md:mb-12;
}
.inner {
  @apply items-center h-full;
}

.logoSection {
  @apply col-span-2;
}

.iconsSection {
  @apply flex justify-end space-x-3 col-span-2 md:col-end-9 lg:col-end-13;
}
</style>
