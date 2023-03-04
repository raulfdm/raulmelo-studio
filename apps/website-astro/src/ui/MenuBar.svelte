<script lang="ts">
  import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
  import { getPathnameWithLocale } from '@/infrastructure/utils/url';
  import { type SupportedLanguages } from '@raulmelo/core/config';
  import Logo from './Logo.svelte';
  import MenuButton from './MenuBarButton.svelte';
  import { IconMenu2, IconX } from '@tabler/icons-svelte';
  import {
    sideMenuStore,
    toggleSideMenu,
  } from '@/infrastructure/stores/sideMenu';
  import MenuBarLanguageSwitch from './MenuBarLanguageSwitch.svelte';
  import MenuBarThemeSwitch from './MenuBarThemeSwitch.svelte';

  export let lang: SupportedLanguages;

  const intl = getIntl(lang);
</script>

<div
  class="relative inset-x-0 z-40 h-16 mb-8 duration-200 bg-white shadow dark:bg-blue-800 transition-theme ease md:mb-12"
>
  <nav class="items-center h-full grid-container">
    <section data-testid="menu-bar__logo" class="col-span-2">
      <a
        href={getPathnameWithLocale(`/`, lang)}
        class="text-primary"
        aria-label={intl.formatMessage({
          id: `menu.logoAriaLabel`,
        })}
      >
        <Logo />
      </a>
    </section>
    <section
      class="flex items-center justify-end col-span-2 space-x-3 md:col-end-9 lg:col-end-13"
    >
      <MenuBarThemeSwitch />
      <MenuBarLanguageSwitch />
      <MenuButton
        on:click={toggleSideMenu}
        aria-label={intl.formatMessage({
          id: `menu.sideMenuButtonAriaLabel`,
        })}
        data-testid="side-menu-button"
      >
        {#if $sideMenuStore === false}
          <IconMenu2 class="w-6" />
        {:else}
          <IconX class="w-6" />
        {/if}
      </MenuButton>
    </section>
  </nav>
</div>

<!-- 

      <ThemeSwitch
        label={intl.formatMessage({
          id: `menu.themeButtonAriaLabel`,
        })}
      />
      <LanguageSwitch
        {lang}
        {pathname}
        label={intl.formatMessage({
          id: `menu.languageButtonAriaLabel`,
        })}
      />
      <MenuButton
        onClick={sideMenu.toggle}
        aria-label={intl.formatMessage({
          id: `menu.sideMenuButtonAriaLabel`,
        })}
        data-testid="side-menu-button"
      >
        <Icon class="w-6" />
      </MenuButton>

 -->
