<script lang="ts">
  import Tag from '@components/Tag.svelte';
  import Tags from '@components/Tags.svelte';
  import classNames from 'classnames';

  import { getTagUrl } from '../utils/url';
  interface PostBasicProps {
    title: string;
    subtitle?: string;
    url: string;
    type?: 'post' | 'til';
    publishedAt: string;

    tags: {
      name: string;
      slug: string;
      id: string;
    }[];
  }

  export let post: PostBasicProps;
  export let titleClassName: string = '';
  export let className: string = '';
</script>

<section class={classNames('shadow bg-color-secondary', className)}>
  <a class="relative inline-block cursor-pointer" href={post.url}>
    <h3 class={classNames('font-extrabold', titleClassName)}>{post.title}</h3>
  </a>

  <div class="flex space-x-4 mb-2.5">
    <span class="block text-md font-sans">
      <time dateTime={post.publishedAt} class="publish-date">
        {post.publishedAt}
      </time>
    </span>
    {#if post.type}
      <span
        class={classNames([
          'px-2 rounded-sm min-width[40px] text-center font-bold text-gray-50 uppercase',
          post.type === 'post' ? 'bg-indigo-600' : 'bg-yellow-600',
        ])}>{post.type}</span
      >
    {/if}
  </div>

  {#if post.subtitle}
    <p
      class="text-lg lg:text-md text-primary dark:text-gray-200 text-opacity-80 dark:text-opacity-100"
    >
      {post.subtitle}
    </p>
  {/if}

  {#if post.tags}
    <Tags className="mt-4">
      {#each post.tags as { name, slug }}
        <Tag>
          <a href={getTagUrl(slug)} class="tag-link">#{name}</a>
        </Tag>
      {/each}
    </Tags>
  {/if}
</section>
