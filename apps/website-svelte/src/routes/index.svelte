<script context="module" lang="ts">
  import { Backend } from '../services/Backend';

  export async function load() {
    const NUMBER_OF_POSTS = 2;
    const locale = 'en';

    const query = `
    query Home {
      posts(locale: "${locale}", sort: "date:desc", limit: ${NUMBER_OF_POSTS}) {
        id
        slug
        date
        title
        subtitle
        locale
        description
        featured_image {
          width
          height
          url
        }
        post_tags {
          ...tagsFragment
        }
      }
    
      tils(locale: "${locale}", sort: "publishedAt:desc", limit: ${NUMBER_OF_POSTS}) {
        id
        title
        publishedAt
        locale
        slug
        tags {
          ...tagsFragment
        }
      }
    }
    
    fragment tagsFragment on PostTag {
      slug
      id
      name
    }  
  `;

    const { posts, tils } = await Backend.graphql(query);

    return {
      props: {
        posts,
        tils,
      },
    };
  }
</script>

<script lang="ts">
  import AuthorPresentation from '@components/AuthorPresentation.svelte';
  import HomePostSection from '@components/HomePostSection.svelte';

  import { getTilUrl, getPostUrl } from '../utils/url';

  // TODO: add types heres
  export let posts;
  export let tils;
</script>

<AuthorPresentation />
<HomePostSection
  title="Latests posts"
  checkAllLink={{
    href: '/blog',
    text: 'See all posts',
  }}
  posts={posts.map((post) => ({
    ...post,
    publishedAt: post.date,
    tags: post.post_tags,
    url: getPostUrl(post.slug),
  }))}
/>
<hr />
<HomePostSection
  title={`Latests TILs ("Today I Learned")`}
  checkAllLink={{
    href: '/til',
    text: 'See all TILs',
  }}
  posts={tils.map((til) => ({
    ...til,
    url: getTilUrl(til.slug),
  }))}
/>

<style>
  hr {
    margin: 0;
    margin-bottom: 2rem;
    grid-column: 1 / -1;
    color: inherit;
    border: 0;

    border-top: 1px solid rgb(229, 231, 235);
  }

  @media (min-width: 768px) {
    hr {
      grid-column-start: 2;
      grid-column-end: 6;
    }
  }

  @media (min-width: 1024px) {
    hr {
      grid-column-start: 3;
      grid-column-end: 10;
    }
  }
</style>
