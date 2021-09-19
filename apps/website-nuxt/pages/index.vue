<script lang="ts">
import { domains } from '@raulfdm/core';
import { defineComponent, useAsync } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const content = useAsync(() => domains.posts.queryPostsAndTils('en', 2));

    return {
      posts: content?.value?.posts,
      tils: content?.value?.tils,
    };
  },
});
</script>

<template>
  <div>
    <h1>hi :)</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
      <li v-for="til in tils" :key="til.id">{{ til.title }}</li>
    </ul>
  </div>
</template>
