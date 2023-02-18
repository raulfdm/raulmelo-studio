<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const schemas = data.trainingSheet.schema || [];
</script>

<svelte:head>
	<title>Fitness Buddy</title>
</svelte:head>

{#if schemas.length > 0}
	<nav class="grid grid-cols-2 gap-6">
		{#each schemas as schema}
			<a data-sveltekit-preload-data="tap" href={`/workout/${schema._id}`} class="workout-link">
				<h2 class="title">
					{schema.routine.name}
					{#if schema.routine.description}
						<span class="subtitle">{schema.routine.description}</span>
					{/if}
				</h2>
			</a>
		{/each}
	</nav>
{:else}
	<p class="text-center">No training sheets found</p>
{/if}

<style lang="postcss">
	.workout-link {
		@apply rounded;
		@apply p-6;
		@apply shadow;
		@apply space-y-2;
		@apply bg-white;
		@apply grid place-items-center;
		min-height: 120px;
	}
	.title {
		@apply text-xl font-semibold text-center;
	}
	.title .subtitle {
		@apply text-sm font-normal block;
	}
</style>
