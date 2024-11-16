<script lang="ts">
  import { Popover } from 'bits-ui';

  import { getPathnameWithoutLocale } from '@/infrastructure/utils/url';
  import {
    SupportedLanguagesEnum,
    type SupportedLanguage,
  } from '@raulmelo/core/intl';
  import { LanguagesIcon } from 'lucide-svelte';

  interface Props {
    ariaLabel: string;
  }

  let { ariaLabel }: Props = $props();

  function changeLocale(lang: SupportedLanguage) {
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
    class="z-40 flex flex-col bg-white border divide-y divide-gray-200 rounded shadow-sm max-w-min dark:border-gray-400 dark:divide-gray-500 dark:bg-blue-800"
  >
    <Popover.Arrow class="arrow" />

    <button
      class="language-button"
      aria-label="Switch to English"
      onclick={changeLocale(SupportedLanguagesEnum.ENGLISH)}>English</button
    >
    <button
      class="language-button"
      aria-label="Mudar para Português"
      onclick={changeLocale(SupportedLanguagesEnum.PORTUGUESE)}
      >Português</button
    >
  </Popover.Content>
</Popover.Root>

<style lang="postcss">
  .language-button {
    @apply flex-1;
    @apply px-6 py-2;
    @apply font-sans text-base text-center;
    @apply whitespace-nowrap;
    @apply disabled:font-semibold disabled:text-secondary;
    @apply cursor-pointer disabled:cursor-not-allowed;
  }
</style>
