<script lang="ts">
  import GithubIcon from '@components/Icons/GithubIcon.svelte';
  import TwitterIcon from '@components/Icons/TwitterIcon.svelte';
  import LinkedInIcon from '@components/Icons/LinkedInIcon.svelte';
  import siteee from 'site-data';

  const { personalInformation, defaultSeo: allDefaultSeo, socials } = siteee;

  const defaultSeo = allDefaultSeo['en'];

  socials;

  const github = {
    url: '',
  };
  const twitter = {
    url: '',
  };
  const linkedIn = {
    url: '',
  };
</script>

<header
  class="flex flex-col-reverse justify-between md:flex-row mb-7 col-span-full"
>
  <aside class="flex flex-col w-full md:max-width[75%] mt-4 md:mt-0">
    <h1 class="font-sans font-black text-2xl md:text-3xl xl:text-4xl">
      {personalInformation.full_name}
    </h1>
    <p class="text-md md:text-md xl:text-lg mt-2.5">
      {defaultSeo?.description}
    </p>
    <section
      class="flex items-center pt-5 flex-1 dark:opacity-90 space-x-4 text-secondary"
    >
      <a href={github.url} class="w-6 lg:w-8">
        <GithubIcon />
      </a>
      <a href={twitter.url} class="w-6 lg:w-8">
        <TwitterIcon />
      </a>
      <a href={linkedIn.url} class="w-6 lg:w-8">
        <LinkedInIcon />
      </a>
    </section>
  </aside>
  <figure class="relative w-20 md:w-32 h-20 md:h-32 rounded">
    <!-- TODO: fix alt -->
    <img
      src={personalInformation.profile_pic.url}
      alt="stuff"
      class="rounded-full object-cover"
    />
  </figure>
</header>
