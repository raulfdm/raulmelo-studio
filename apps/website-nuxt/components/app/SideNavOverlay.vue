<script lang="ts">
/**
 * TODO: As soon this project is updated to Nuxt 3, move
 * this component to use TELEPORT
 */
import {
  defineComponent,
  useStore,
  computed,
  getCurrentInstance,
} from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance()!;

    /**
     * OMG this is hacky.
     * $style is not defined on proxy type instance.
     * If I don't do that, TS will throw an error.
     *
     * I hope this is fixed on vue 3 / nuxt 3.
     */
    type CustomProxy = typeof proxy & {
      $style: {
        open: string;
        closed: string;
        overlay: string;
      };
    };

    const customProxy = proxy as CustomProxy;

    const { state } = useStore<RootStoreState>();

    const overlayClasses = computed<string[]>(function () {
      return [
        customProxy.$style.overlay,
        state.sideMenu.state === 'open'
          ? customProxy.$style.open
          : customProxy.$style.closed,
      ];
    });

    const isOpen = computed(function () {
      return state.sideMenu.state === 'open';
    });

    return {
      overlayClasses,
      isOpen,
    };
  },
});
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" :class="overlayClasses" data-testid="sideMenuOverlay" />
  </transition>
</template>

<style module>
.overlay {
  @apply inset-0;
  @apply absolute top-16;
  @apply z-10;
  @apply w-full h-full;

  background-color: rgba(0, 0, 0, 0.7);
}

.overlay:global(.fade-enter-active),
.overlay:global(.fade-leave-active) {
  transition: opacity 0.1s;
}
.overlay:global(.fade-enter),
.overlay:global(.fade-leave-to) /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
