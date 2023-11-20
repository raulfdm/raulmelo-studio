<script lang="ts">
  import {
    Popover,
    PopoverButton,
    PopoverPanel,
  } from '@rgossiaux/svelte-headlessui';
  import { createPopperActions } from 'svelte-popperjs';

  import { getPathnameWithoutLocale } from '@/infrastructure/utils/url';
  import type { SupportedLanguages } from '@raulmelo/core/config';
  import { IconLanguage } from '../icons';

  export let ariaLabel: string;

  const [popperRef, popperContent] = createPopperActions();

  const popperOptions = {
    placement: `bottom-end`,
    modifiers: [
      {
        name: `offset`,
        options: {
          offset: [0, 12],
        },
      },
      { name: `arrow`, options: { /*  element: arrowElement, */ padding: 5 } },
    ],
  };

  function changeLocale(lang: SupportedLanguages) {
    return () => {
      const pathnameWithoutLocale = getPathnameWithoutLocale(
        window.location.pathname,
      );

      window.location.href = `/${lang}${pathnameWithoutLocale}`;
    };
  }
</script>

<Popover>
  <PopoverButton
    use={[popperRef]}
    class="flex p-2 place-content-center"
    aria-label={ariaLabel}
  >
    <IconLanguage class="w-6" stroke={1.5} />
  </PopoverButton>
  <PopoverPanel
    use={[[popperContent, popperOptions]]}
    class="z-10 flex flex-col bg-white border divide-y divide-gray-200 rounded shadow-sm max-w-min dark:border-gray-400 dark:divide-gray-500 dark:bg-blue-800"
  >
    <div
      class="z-20 w-4 h-4 bg-white border-t border-l rounded-sm dark:bg-blue-800 dark:border-gray-400 -top-2 arrow"
      data-popper-arrow
    />

    <PopoverButton
      class="flex-1 px-6 py-2 font-sans text-base text-center cursor-pointer whitespace-nowrap disabled:cursor-not-allowed disabled:font-semibold disabled:text-secondary"
      aria-label="Switch to English"
      on:click={changeLocale(`en`)}
    >
      English
    </PopoverButton>
    <PopoverButton
      class="flex-1 px-6 py-2 font-sans text-base text-center cursor-pointer whitespace-nowrap disabled:cursor-not-allowed disabled:font-semibold disabled:text-secondary"
      aria-label="Mudar para Português"
      on:click={changeLocale(`pt`)}
    >
      Português
    </PopoverButton>
  </PopoverPanel>
</Popover>

<style lang="postcss">
  .arrow {
    transform: translate3d(93px, 0px, 0px) rotate(45deg) !important;
  }
</style>
