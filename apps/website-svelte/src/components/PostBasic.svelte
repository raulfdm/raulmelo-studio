<script lang="ts">
  import Tag from '@components/Tag.svelte';
  import Tags from '@components/Tags.svelte';

  import { getTagUrl } from '../utils/url';
  interface PostBasicProps {
    title: string;
    subtitle?: string;
    url: string;
    type?: 'post' | 'til';
    // className?: string | TwStyle;
    // as?: React.ElementType;
    publishedAt: string;
    // titleClassName?: string | TwStyle;
    tags: {
      name: string;
      slug: string;
      id: string;
    }[];
  }

  export let post: PostBasicProps;

  /*
   
  
  */
</script>

<section class="shadow bg-color-secondary">
  <a class="title" href={post.url}>
    <h3>{post.title}</h3>
  </a>

  <div class="meta">
    <span>
      <time dateTime={post.publishedAt} class="publish-date">
        {post.publishedAt}
      </time>
    </span>
    {#if post.type}
      <span>{post.type}</span>
    {/if}
  </div>

  {#if post.subtitle}
    <p class="subtitle">{post.subtitle}</p>
  {/if}

  {#if post.tags}
    <Tags>
      {#each post.tags as { name, slug }}
        <Tag>
          <a href={getTagUrl(slug)} class="tag-link">#{name}</a>
        </Tag>
      {/each}
    </Tags>
  {/if}
</section>

<style>
  section {
    padding: 1.5rem;
    border-radius: 0.125rem;
  }

  .title {
    font-weight: 800;
    font-size: 1.777rem;
    line-height: 1.3;
    color: inherit;

    position: relative;
    display: inline-block;
    cursor: pointer;

    text-decoration: none;
  }

  .subtitle {
    font-size: 1.333rem;
    line-height: 1.3;
    opacity: 0.8;
  }

  .meta {
    display: flex;
    margin-bottom: 0.625rem;
  }

  .meta .publish-date {
    display: block;
    font-size: 1.125rem;
    line-height: 1.3;
  }

  .tag-link {
    color: inherit;
  }
</style>
