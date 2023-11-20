<script lang="ts">
  import qs from 'query-string';

  import type { ShareContentProps } from './types';
  import { IconBrandLinkedin, IconBrandTwitter } from '../icons-svelte';

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

<div class="flex flex-col gap-2">
  <span class="block font-extrabold text-md md:text-lg lg:text-xl">
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
        <IconBrandLinkedin size={32} stroke={1.5} />
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
        <IconBrandTwitter size={32} stroke={1.5} />
      </a>
    </li>
  </ul>
</div>
