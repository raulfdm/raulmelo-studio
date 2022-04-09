<script lang="ts">
  import ContentTitle from '$lib/components/ContentTitle.svelte';

  import { activityStore } from '../activityStore';
  console.log($activityStore.currentTraining);
  const youtubeUrl = $activityStore.currentTraining.exercise.youtubeVideoId
    ? `https://www.youtube.com/embed/${$activityStore.currentTraining.exercise.youtubeVideoId}`
    : undefined;
</script>

<ContentTitle title={$activityStore.currentTraining.exercise.name} />

{#if youtubeUrl}
  <div class="aspect-w-2 aspect-h-1">
    <iframe
      src={youtubeUrl}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
{:else if $activityStore.currentTraining.exercise.image.url}
  <figure class="aspect-w-16 aspect-h-9">
    <img
      class="object-cover object-center w-full h-full"
      src={$activityStore.currentTraining.exercise.image.url}
      alt={$activityStore.currentTraining.exercise.name}
    />
  </figure>
{:else}
  <ContentTitle title="Nenhuma imagem" />
{/if}

<style lang="postcss">
  .title {
  }
</style>
