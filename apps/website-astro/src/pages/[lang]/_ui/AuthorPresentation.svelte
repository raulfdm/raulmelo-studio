<script lang="ts">
  // import { Image } from '@astrojs/image/components';
  import { type SupportedLanguages } from '@raulmelo/core/config';
  import { type QuerySiteDataReturnType } from '@raulmelo/core/domains';

  import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
  import { getSocial } from '@/infrastructure/utils/seo';
  import {
    IconBrandGithub,
    IconBrandMedium,
    IconBrandLinkedin,
    IconBrandTwitter,
  } from '@tabler/icons-svelte';
  import DevToIcon from '@/ui/Icons/DevTo.svelte';

  import IconWrapper from './IconWrapper.svelte';

  export let lang: SupportedLanguages;
  export let siteData: QuerySiteDataReturnType;

  const defaultSeo = siteData.defaultSeo[lang];

  const intl = getIntl(lang);

  const github = getSocial(`github`, siteData);
  const twitter = getSocial(`twitter`, siteData);
  const linkedIn = getSocial(`linkedin`, siteData);
  const devTo = getSocial(`dev.to`, siteData);
  const medium = getSocial(`medium`, siteData);
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
        <DevToIcon size={32} />
      </IconWrapper>
      <IconWrapper
        href={medium.url}
        data-testid="author__linkedInUrl"
        title={intl.formatMessage({
          id: `authorPresentation.mediumLinkTitle`,
        })}
      >
        <IconBrandMedium size={32} />
      </IconWrapper>
      <IconWrapper
        href={github.url}
        data-testid="author__githubUrl"
        title={intl.formatMessage({
          id: `authorPresentation.githubLinkTitle`,
        })}
      >
        <IconBrandGithub size={32} />
      </IconWrapper>
      <IconWrapper
        href={twitter.url}
        data-testid="author__twitterUrl"
        title={intl.formatMessage({
          id: `authorPresentation.twitterLinkTitle`,
        })}
      >
        <IconBrandTwitter size={32} />
      </IconWrapper>
      <IconWrapper
        href={linkedIn.url}
        data-testid="author__linkedInUrl"
        title={intl.formatMessage({
          id: `authorPresentation.linkedInLinkTitle`,
        })}
      >
        <IconBrandLinkedin size={32} />
      </IconWrapper>
    </section>
  </aside>
  <figure class="relative w-20 h-20 rounded md:w-32 md:h-32">
    <slot name="img" />
  </figure>
</header>
