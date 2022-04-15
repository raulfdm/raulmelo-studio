<script lang="ts">
  import ContentTitle from '$lib/components/ContentTitle.svelte';

  import { activityStore } from '../activityStore';

  let currentExercise = $activityStore.currentTraining.exercise;

  const youtubeUrl = currentExercise.youtubeVideoId
    ? `https://www.youtube.com/embed/${currentExercise.youtubeVideoId}`
    : undefined;
</script>

<ContentTitle title="Video" />

<div class="aspect-w-2 aspect-h-1">
  <iframe
    src={youtubeUrl}
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  />
</div>

<br />

{#if currentExercise?.image?.url}
  <ContentTitle title="Image" />

  <figure class="aspect-w-16 aspect-h-9">
    <img
      class="object-cover object-center w-full h-full"
      src={currentExercise.image.url}
      alt={currentExercise.name}
    />
  </figure>
{/if}
