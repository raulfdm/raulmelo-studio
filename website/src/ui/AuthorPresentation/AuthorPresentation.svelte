<script lang="ts">
  import type { SupportedLanguage } from '@raulmelo/core/intl';

  import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
  import { getSocial } from '@/infrastructure/utils/seo';

  import DevToLogo from '@/ui/Icons/DevToLogo.svelte';

  import IconWrapper from '../../pages/[lang]/_ui/IconWrapper.svelte';
  import LinkedinIcon from '@/ui/Icons/LinkedinLogo.svelte';
  import GithubIcon from '@/ui/Icons/GithubLogo.svelte';
  import type { QuerySiteDataReturnType } from '@/infrastructure/api/modules/siteData';

  interface Props {
    lang: SupportedLanguage;
    siteData: QuerySiteDataReturnType;
    img?: import('svelte').Snippet;
  }

  let { lang, siteData, img }: Props = $props();

  const defaultSeo = siteData.defaultSeo[lang];

  const intl = getIntl(lang);

  const github = getSocial(`github`, siteData);
  const twitter = getSocial(`twitter`, siteData);
  const linkedIn = getSocial(`linkedin`, siteData);
  const devTo = getSocial(`dev.to`, siteData);
</script>

<header
  class="flex flex-col-reverse justify-between md:flex-row mb-7 col-span-full"
>
  <aside class="flex flex-col w-full md:max-w-[75%] mt-4 md:mt-0">
    <h1
      class="font-sans text-2xl font-black md:text-3xl xl:text-4xl"
      data-testid="author__name"
    >
      {siteData.personalInformation.fullName}
    </h1>
    <p
      class="text-md md:text-md xl:text-lg mt-2.5"
      data-testid="author__description"
    >
      {defaultSeo?.description}
    </p>
    <section
      class="flex items-center flex-1 pt-5 space-x-4 dark:opacity-90 text-secondary"
    >
      <IconWrapper
        href={devTo.url}
        data-testid="author__linkedInUrl"
        title={intl.formatMessage({
          id: `authorPresentation.devToLinkTitle`,
        })}
      >
        <DevToLogo size={28} stroke="1.5" />
      </IconWrapper>
      <IconWrapper
        href={github.url}
        data-testid="author__githubUrl"
        title={intl.formatMessage({
          id: `authorPresentation.githubLinkTitle`,
        })}
      >
        <GithubIcon size={28} stroke="1.5" />
      </IconWrapper>
      <IconWrapper
        href={linkedIn.url}
        data-testid="author__linkedInUrl"
        title={intl.formatMessage({
          id: `authorPresentation.linkedInLinkTitle`,
        })}
      >
        <LinkedinIcon size={28} stroke="1.5" />
      </IconWrapper>
    </section>
  </aside>
  <figure class="relative w-20 h-20 rounded-sm md:w-32 md:h-32">
    {@render img?.()}
  </figure>
</header>
