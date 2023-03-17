<script lang="ts">
	import IconBrandYoutube from '@tabler/icons-svelte/dist/svelte/icons/IconBrandYoutube.svelte';

	import { activityStore } from '$lib/stores/old/activity';

	let currentExercise = $activityStore.currentTraining.exercise;

	const youtubeUrl = currentExercise.youtubeVideoId
		? `https://www.youtube.com/watch?v=${currentExercise.youtubeVideoId}`
		: undefined;
</script>

{#if currentExercise?.image?.url}
	<figure class="aspect-w-16 aspect-h-9">
		<img
			class="object-cover object-center w-full h-full"
			src={currentExercise.image.url}
			alt={currentExercise.name}
		/>
	</figure>
{/if}

{#if youtubeUrl}
	<a href={youtubeUrl} target="_blank" rel="noreferrer" class="grid mt-4 place-items-center">
		<IconBrandYoutube size={36} />
	</a>
{/if}
