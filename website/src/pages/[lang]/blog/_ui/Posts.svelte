<script lang="ts">
  import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
  import ContentTile from '@/ui/ContentTile.svelte';
  import type { SupportedLanguages } from '@/infrastructure/config/types/language';
  import type { QueryPostsAndTilsReturnType } from '@raulmelo/core/domains';
  import { getPostUrl } from '@/infrastructure/utils/url';

  export let posts:
    | QueryPostsAndTilsReturnType[`posts`]
    | QueryPostsAndTilsReturnType[`tils`];
  export let lang: SupportedLanguages;

  const intl = getIntl(lang);
  const title = intl.formatMessage({ id: `blog.title.latests` });
  const readMoreLabel = intl.formatMessage({ id: `blog.readMore` });
</script>

<section class="col-span-full">
  <h2 class="mb-4 font-sans text-lg font-extrabold lg:text-xl lg:mb-8">
    {title}
  </h2>

  <ul class="space-y-10">
    {#if posts}
      {#each posts as post}
        <li>
          <ContentTile
            formatDate={function (date) {
              return intl.formatDate(date, {
                year: `numeric`,
                month: `long`,
                day: `numeric`,
              });
            }}
            urlBuilder={(slug) => getPostUrl(slug, lang)}
            {readMoreLabel}
            {...post}
          />
        </li>
      {/each}
    {/if}
  </ul>
</section>
