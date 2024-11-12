<script lang="ts">
  import { mergeClasses } from '@/infrastructure/utils/misc';
  import { ArrowRightIcon } from 'lucide-svelte';

  export let slug: string;
  export let publishedAt: string;
  export let title: string;
  export let urlBuilder: (slug: string) => string;
  export let readMoreLabel: string;
  export let formatDate: (publishedAt: string) => string;

  export let description = '';
  export let subtitle = '';

  let isFocused = false;
</script>

<article
  class="mb-3"
  on:mouseenter={() => (isFocused = true)}
  on:mouseleave={() => (isFocused = false)}
>
  <a href={urlBuilder(slug)} class="relative inline-block cursor-pointer">
    <h3
      class={mergeClasses(`text-lg font-black md:text-xl`, {
        'text-secondary': isFocused,
      })}
    >
      {title}
    </h3>
    {#if subtitle}
      <h4
        class="font-medium text-gray-600 dark:text-gray-300 text-md md:text-lg mb-2.5"
      >
        {subtitle}
      </h4>
    {/if}

    <span class="block text-md lg:text-base font-sans mb-2.5">
      <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
    </span>
    {#if description}
      <p
        class="text-base md:text-md text-primary dark:text-gray-200 text-opacity-80 dark:text-opacity-100"
      >
        {description}
      </p>
    {/if}
    <span
      class={mergeClasses(`flex mt-3 font-bold`, {
        'font-extrabold text-secondary': isFocused,
      })}
    >
      {readMoreLabel}
      <ArrowRightIcon class="w-4 ml-2" stroke="1.5" />
    </span>
  </a>
</article>
