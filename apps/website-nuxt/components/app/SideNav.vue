<script lang="ts">
import { defineComponent, computed, useStore } from '@nuxtjs/composition-api';
const locale = 'en';

const links = [
  {
    href: '/',
    localeId: 'sideMenu.home',
  },
  {
    href: '/blog',
    localeId: 'sideMenu.blog',
  },
  {
    href: '/til',
    localeId: 'sideMenu.til',
  },
  {
    href: '/search',
    localeId: 'sideMenu.search',
  },
  {
    href: '/uses',
    localeId: 'sideMenu.uses',
  },
  {
    href: '/cv',
    localeId: 'sideMenu.cv',
  },
  {
    href: locale === 'en' ? '/rss.xml' : '/rss-pt.xml',
    localeId: 'sideMenu.rss',
    newWindow: true,
  },
];

export default defineComponent({
  setup() {
    const { state } = useStore<RootStoreState>();

    const isOpen = computed(function () {
      return state.sideMenu.state === 'open';
    });

    const rootClasses = computed(function () {
      return ['container', state.sideMenu.state];
    });

    return { links, rootClasses, isOpen };
  },
});
</script>

<template>
  <transition name="slide">
    <section v-if="isOpen" :class="rootClasses">
      <nav class="nav">
        <nuxt-link
          v-for="link in links"
          :key="link.href"
          :to="link.href"
          class="navItem"
          >{{ link.localeId }}</nuxt-link
        >
      </nav>
    </section>
  </transition>
</template>

<style scoped>
.container {
  @apply fixed;
  @apply bottom-0 right-0 top-16;
  @apply z-20;
  @apply h-full min-w-full sm:min-w-min sm:w-full sm:max-w-xs;
  @apply transition-theme duration-200 ease-in-out;
  @apply transform translate-x-full;
  @apply bg-white dark:bg-blue-800;

  transition: translate3d(0%, 0, 0);
}

.container:global(.slide-enter-active),
.container:global(.slide-leave-active) {
  transition: transform 0.1s;
}
.container:global(.slide-enter),
.container:global(.slide-leave-to) /* .fade-leave-active below version 2.1.8 */ {
  transform: translate3d(100%, 0, 0);
}

.closed {
  transform: translate3d(100%, 0, 0);
  /* display: none; */
}

.open {
  transform: translate3d(0%, 0, 0);
}

.nav {
  @apply flex flex-col py-6;
}

.navItem {
  @apply px-4 py-2;
  @apply text-center sm:text-left;
  @apply mx-5 text-xl font-black cursor-pointer sm:text-lg;
}

.navItem.nuxt-link-active {
  @apply border-b-2 border-secondary border-opacity-80;
  @apply sm:pl-3 sm:border-l-2 sm:border-b-0;
  @apply transition-theme;
}
</style>
