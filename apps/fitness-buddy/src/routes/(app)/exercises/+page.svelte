<script lang="ts">
	import Fuse from 'fuse.js';
	import type { PageData } from './$types';
	import type { ExerciseItem } from '$lib/infrastructure/models/getAllExercises';
	import { IconBrandYoutube } from '@tabler/icons-svelte';

	export let data: PageData;

	let searchQuery = '';
	let shouldShowSearchResults = false;

	let searchResults: Fuse.FuseResult<ExerciseItem>[];
	let selectedExercise: ExerciseItem;

	const fuse = new Fuse(data.exercises, {
		keys: ['name'],
		threshold: 0.3
	});

	$: {
		searchResults = fuse.search(searchQuery);

		console.log(searchResults);
	}

	function handleExerciseClick(exercise: ExerciseItem) {
		selectedExercise = exercise;
		searchQuery = exercise.name;
		shouldShowSearchResults = false;
	}

	function selectAlternative(exercise: NonNullable<ExerciseItem['alternatives']>[number]) {
		searchQuery = exercise.name;
		const [{ item }] = fuse.search(searchQuery);
		shouldShowSearchResults = false;
		selectedExercise = item;
	}

	function onSearchInputFocus(event: FocusEvent) {
		shouldShowSearchResults = true;
		const target = event.target as HTMLInputElement;
		target.select();
	}
</script>

<div>
	<h1 class="my-4 text-4xl font-bold text-center">Exercises</h1>
	<input
		type="text"
		placeholder="Search for an exercise"
		class="w-full max-w-xs input input-bordered"
		bind:value={searchQuery}
		on:focus={onSearchInputFocus}
	/>
	{#if searchQuery && shouldShowSearchResults}
		<div
			class="z-10 flex flex-col w-full max-w-xs gap-2 overflow-auto bg-white border border-t-0 rounded-t-none max-h-40 rounded-xl"
		>
			{#each searchResults as { item: exercise }}
				<button on:click={() => handleExerciseClick(exercise)} class="hover:bg-pink-200">
					<h2 class="m-4 font-semibold text-left ">
						{exercise.name}
					</h2>
				</button>
			{/each}
		</div>
	{/if}
</div>

{#if selectedExercise}
	<section class="flex flex-col items-center gap-4 mt-4">
		<h2 class="text-2xl font-semibold">{selectedExercise.name}</h2>
		<div>
			<a
				href={`https://www.youtube.com/watch?v=${selectedExercise.video.videoId}`}
				class="inline-block"
				target="_blank"
				rel="noreferrer"
			>
				<IconBrandYoutube size={24} />
			</a>
		</div>
		<img
			class="w-full max-w-2xl rounded-lg shadow-xl"
			src={selectedExercise.image.url}
			alt={selectedExercise.name}
		/>

		<section class="w-full">
			<h3 class="text-xl font-semibold">Alternatives</h3>
			{#if selectedExercise.alternatives && selectedExercise.alternatives.length > 0}
				<ul class="mt-4 space-y-4">
					{#each selectedExercise.alternatives as alternative}
						<li class="">
							<button on:click={() => selectAlternative(alternative)}>
								{alternative.name}
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	</section>
{/if}
