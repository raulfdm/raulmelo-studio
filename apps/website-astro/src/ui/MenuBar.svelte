<script lang="ts">
  import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
  import { getPathnameWithLocale } from '@/infrastructure/utils/url';
  import { SupportedLanguages } from '@raulmelo/core/config';
  import Logo from './Logo.svelte';

  export let lang: SupportedLanguages;
  export let logo: any;

  const intl = getIntl(lang);

  console.log($$props, logo);
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
      class="flex justify-end col-span-2 space-x-3 md:col-end-9 lg:col-end-13"
    >
      Hoi
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
