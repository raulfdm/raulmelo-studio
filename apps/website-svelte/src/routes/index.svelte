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
  import AuthorPresentation from '../components/AuthorPresentation.svelte';
  export let posts;
  export let tils;

  console.log({ posts, tils });
</script>

<AuthorPresentation />

<hr />

<style>
  hr {
    margin-bottom: 32px;
  }
</style>
