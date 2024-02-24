<script lang="ts">
  import type { QueryTilsReturnType } from '@/infrastructure/api/modules/posts';
  import type { SupportedLanguages } from '@/infrastructure/config/types/language';

  import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
  import { getTilUrl } from '@/infrastructure/utils/url';
  import ContentTile from '@/ui/ContentTile.svelte';

  export let tils: QueryTilsReturnType;
  export let lang: SupportedLanguages;
  const intl = getIntl(lang);
</script>

<ul class="space-y-8">
  {#each tils as til}
    <li>
      <ContentTile
        formatDate={(date) =>
          intl.formatDate(date, {
            month: `long`,
            day: `numeric`,
            year: `numeric`,
          })}
        readMoreLabel={intl.formatMessage({ id: `tilHome.readMore` })}
        urlBuilder={(slug) => getTilUrl(slug, lang)}
        {...til}
      />
    </li>
  {/each}
</ul>
