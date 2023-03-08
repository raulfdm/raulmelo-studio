<script lang="ts">
  import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
  import { getPathnameWithLocale } from '@/infrastructure/utils/url';
  import { type SupportedLanguages } from '@raulmelo/core/config';
  import Logo from '../Logo.svelte';
  import MenuBarLanguageSwitch from './MenuBarLanguageSwitch.svelte';
  import MenuBarThemeSwitch from './MenuBarThemeSwitch.svelte';
  import { SideMenu } from '../SideMenu';
  import MenuBarSideMenuButton from './MenuBarSideMenuButton.svelte';

  export let lang: SupportedLanguages;
  export let pathname: string;

  const intl = getIntl(lang);

  /**
   * Having this option in a post Page leads into an undesired behaviour.
   *
   * Not all posts has translations. It means that if the user try to switch
   * locale in a post which does not its equivalent in the selected language,
   * it'll throw redirects the user to a 404 page.
   *
   * For handling posts translations I have the "AvailableTranslations" component
   * which allow the user know when this post has translations available and also
   * redirects he/she for the correct page
   */
  function shouldHideLanguage() {
    const isBlogPost = pathname.match(/\/blog\/.*/);
    const isTilPost = pathname.match(/\/til\/.*/);

    return isBlogPost || isTilPost;
  }
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
      {#if !shouldHideLanguage()}
        <MenuBarLanguageSwitch />
      {/if}
      <MenuBarSideMenuButton
        ariaLabel={intl.formatMessage({
          id: `menu.sideMenuButtonAriaLabel`,
        })}
      />
    </section>
  </nav>
</div>

<SideMenu {lang} {pathname} />
