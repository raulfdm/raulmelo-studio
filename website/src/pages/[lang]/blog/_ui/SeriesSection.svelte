<script lang="ts">
  import { mergeClasses } from '@/infrastructure/utils/misc';
  import type { PostBySlug } from './types';

  import { getPostUrl } from '@/infrastructure/utils/url';
  import { ChevronDownIcon } from 'lucide-svelte';

  type Post = NonNullable<PostBySlug>;

  type Series = Post['series'];

  interface Props {
    currentPostId: string;
    series: NonNullable<Series>;
    seriesLabel: string;
    language: Post['language'];
  }

  let { currentPostId, series, seriesLabel, language }: Props = $props();
</script>

<section>
  <div
    class="relative my-8 duration-200 bg-white rounded-sm shadow-sm dark:bg-blue-800 transition-theme ease"
    data-testid="series-menu"
  >
    <div>
      <div
        class={mergeClasses([
          `flex content-between cursor-pointer px-4 py-3`,
          `text-lg font-bold md:text-xl duration-300 transition-spacing`,
          `pb-2.5 border-b border-gray-100 dark:border-gray-600`,
        ])}
        data-testid="expand-button"
        role="button"
      >
        <span class="flex-1">{series.name}</span>
        <button class="flex items-center justify-center w-7 h-7">
          <ChevronDownIcon className="w-5" stroke="1.5" />
        </button>
      </div>

      <ul class="pb-0 m-0" data-testid="series-post-list">
        {#each series.posts as { _id, seriesCopy, slug }}
          <li
            class={mergeClasses(
              `cursor-pointer m-0 font-sans text-sm md:text-base`,
              {
                'bg-green-400 hover:bg-green-400 hover:bg-opacity-50':
                  _id === currentPostId,
              },
            )}
            data-testid={`post_${_id}`}
          >
            <a
              href={getPostUrl(slug, language)}
              class="block px-4 py-3 no-underline"
            >
              {seriesCopy}
            </a>
          </li>
        {/each}
      </ul>

      <div
        class={mergeClasses([
          `flex content-between cursor-pointer px-4 py-3`,
          `font-sans text-base md:text-md duration-300 transition-spacing`,
          `pt-2.5 border-t border-gray-100 dark:border-gray-600`,
        ])}
        role="button"
      >
        <span>{seriesLabel}</span>
      </div>
    </div>
  </div>
</section>
