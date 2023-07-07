<script lang="ts">
  import qs from 'query-string';
  import IconBrandLinkedin from '@tabler/icons-svelte/dist/svelte/icons/IconBrandLinkedin.svelte';
  import IconBrandTwitter from '@tabler/icons-svelte/dist/svelte/icons/IconBrandTwitter.svelte';
  import type { ShareContentProps } from './types';

  export let titleLabel: ShareContentProps['titleLabel'];
  export let linkedIn: ShareContentProps['linkedIn'];
  export let twitter: ShareContentProps['twitter'];
  export let appUrl: string;

  const linkIdUrl = `https://www.linkedin.com/shareArticle?${qs.stringify(
    { url: appUrl, ...linkedIn },
    { encode: true, strict: true },
  )}`;

  const twitterUrl = `https://twitter.com/share?${qs.stringify(
    {
      url: appUrl,
      via: `raul_fdm`,
      ...twitter,
    },
    { encode: true, strict: true },
  )}`;
</script>

<div>
  <span class="block mb-4 font-extrabold text-md md:text-lg lg:text-xl md:mb-6">
    {titleLabel}
  </span>
  <ul class="flex space-x-4 text-secondary">
    <li>
      <!-- TODO: localize the title -->
      <a
        href={linkIdUrl}
        title="Share on LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconBrandLinkedin class="w-6 md:w-8" />
      </a>
    </li>

    <li>
      <!-- TODO: localize the title -->
      <a
        href={twitterUrl}
        title="Share on Twitter"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconBrandTwitter />
      </a>
    </li>
  </ul>
</div>
