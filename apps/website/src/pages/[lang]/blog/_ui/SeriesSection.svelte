<script lang="ts">
  import classNames from 'classnames';
  import type { PostBySlug } from './types';

  import IconChevronDown from '@tabler/icons-svelte/dist/svelte/icons/IconChevronDown.svelte';
  import { getPostUrl } from '@/infrastructure/utils/url';

  type Post = NonNullable<PostBySlug>;

  type Series = Post['series'];

  export let currentPostId: string;
  export let series: NonNullable<Series>;
  export let seriesLabel: string;
  export let language: Post['language'];
</script>

<section>
  <div
    class="relative my-8 duration-200 bg-white rounded shadow dark:bg-blue-800 transition-theme ease"
    data-testid="series-menu"
  >
    <div>
      <div
        class={classNames([
          `flex content-between cursor-pointer px-4 py-3`,
          `text-lg font-bold md:text-xl duration-300 transition-spacing`,
          `pb-2.5 border-b border-gray-100 dark:border-gray-600`,
        ])}
        data-testid="expand-button"
        role="button"
      >
        <span class="flex-1">{series.name}</span>
        <button class="flex items-center justify-center w-7 h-7">
          <IconChevronDown className="w-5" />
        </button>
      </div>

      <ul class="pb-0 m-0" data-testid="series-post-list">
        {#each series.posts as { _id, seriesCopy, slug }}
          <li
            class={classNames(
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
        class={classNames([
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
