<script lang="ts">
  import { Popover } from 'bits-ui';

  import { getPathnameWithoutLocale } from '@/infrastructure/utils/url';
  import type { SupportedLanguages } from '@/infrastructure/config/types/language';
  import { LanguagesIcon } from 'lucide-svelte';

  export let ariaLabel: string;

  function changeLocale(lang: SupportedLanguages) {
    return () => {
      const pathnameWithoutLocale = getPathnameWithoutLocale(
        window.location.pathname,
      );

      window.location.href = `/${lang}${pathnameWithoutLocale}`;
    };
  }
</script>

<Popover.Root>
  <Popover.Trigger class="flex p-2 place-content-center">
    <LanguagesIcon class="w-6" stroke="1.5" />
  </Popover.Trigger>
  <Popover.Content
    sideOffset={8}
    class="z-10 flex flex-col bg-white border divide-y divide-gray-200 rounded shadow-sm max-w-min dark:border-gray-400 dark:divide-gray-500 dark:bg-blue-800"
  >
    <Popover.Arrow class="arrow" />

    <button
      class="language-button"
      aria-label="Switch to English"
      on:click={changeLocale(`en`)}>English</button
    >
    <button
      class="language-button"
      aria-label="Mudar para Português"
      on:click={changeLocale(`pt`)}>Português</button
    >
  </Popover.Content>
</Popover.Root>

<style lang="postcss">
  .language-button {
    @apply flex-1 px-6 py-2 font-sans text-base text-center cursor-pointer whitespace-nowrap disabled:cursor-not-allowed disabled:font-semibold disabled:text-secondary;
  }
</style>
