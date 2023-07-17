<script lang="ts">
	import CardioCard from '$lib/components/CardioCard.svelte';
	import ContentTitle from '$lib/components/ContentTitle.svelte';
	import TrainingInfo from '$lib/components/old/Activity/components/TrainingInfo.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	const { trainingRoutine } = data;
</script>

<svelte:head>
	<title>{trainingRoutine.routine.name}</title>
</svelte:head>

<div>
	<h1 class="title">
		{trainingRoutine.routine.name}
		{#if trainingRoutine.routine.description}
			<span class="subtitle">{trainingRoutine.routine.description}</span>
		{/if}
	</h1>

	<hr class="my-6" />

	<div class="space-y-4">
		{#if trainingRoutine.routine.training}
			<section>
				<ContentTitle title="Workout" />
				{#each trainingRoutine.routine.training as training}
					<TrainingInfo {training} />
				{/each}
			</section>
		{/if}

		{#if trainingRoutine.routine.cardio?.time}
			<section>
				<ContentTitle title="Cardio" />
				<CardioCard cardioTime={trainingRoutine.routine.cardio.time} />
			</section>
		{/if}
	</div>
</div>

<style lang="postcss" module>
	.title {
		@apply text-3xl font-bold text-center;
	}

	.subtitle {
		@apply text-base font-normal text-gray-700 italic block;
	}
</style>
