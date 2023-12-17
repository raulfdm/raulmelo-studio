<script lang="ts">
	import IconPlayerPlay from '@tabler/icons-svelte/dist/svelte/icons/IconPlayerPlay.svelte';

	import TabataInputField from '$lib/components/TabataInputField.svelte';
	import { type TabataConfigContext, tabataConfigService } from '$lib/stores/tabata-config';
	import { createLocalStorage } from '$lib/utils/localStorage';
	import { secondsToMinutes } from '$lib/utils/secondsToMinutes';

	const tabataLocalStorage = createLocalStorage<TabataConfigContext>('tabata_clock_config');

	const persistedState = tabataLocalStorage.read();

	if (persistedState !== null) {
		tabataConfigService.send({ type: 'FULL_CONFIG', payload: persistedState });
	}

	tabataConfigService.subscribe((state) => {
		if (state.changed && state.matches('configuring')) {
			tabataLocalStorage.write(state.context);
		}
	});

	const send = tabataConfigService.send;
	const state = tabataConfigService;

	let totalTime: number;

	$: {
		totalTime = getTotalTime($state.context);
	}

	function addNewWorkout() {
		send('ADD_NEW_WORKOUT');
	}

	function removeWorkout(id: string) {
		send({ type: 'REMOVE_WORKOUT', workoutId: id });
	}

	function onWorkoutChange(id: string) {
		return (value: number) => {
			send({
				type: 'CHANGE_WORKOUT',
				payload: {
					workoutId: id,
					value
				}
			});
		};
	}

	function getTotalTime(context: TabataConfigContext) {
		let totalWorkoutTime = 0;

		context.workout.forEach(([_, workout]) => {
			totalWorkoutTime += workout;
		});

		const totalTime = (totalWorkoutTime + context.rest) * context.cycles + context.prepare;

		return totalTime;
	}
</script>

<header class="mb-4">
	<h1 class="text-2xl font-bold">Tabata Clock</h1>
</header>

<div class="flex flex-col max-w-xs gap-4 pb-16 mx-auto">
	<TabataInputField
		id="prepare"
		label="Prepare"
		value={$state.context.prepare}
		onChange={(value) =>
			send({
				type: 'CHANGE_PREPARE',
				payload: { prepare: value }
			})}
	/>

	<section>
		<div class="flex flex-col gap-2">
			{#each $state.context.workout as [id, workout], index (id)}
				<div class="flex flex-col w-full">
					<TabataInputField
						id={id.toString()}
						label={`Workout ${index + 1}`}
						value={workout}
						onChange={onWorkoutChange(id)}
					/>
					<button on:click={() => removeWorkout(id)} class="ml-auto mt-2 text-pink-600 px-3 py-1.5"
						>Delete</button
					>
				</div>
			{/each}
		</div>

		<button class="px-4 py-2 my-4 text-white bg-pink-600 rounded" on:click={addNewWorkout}
			>Add workout</button
		>
	</section>

	<TabataInputField
		id="rest"
		label="Rest"
		value={$state.context.rest}
		onChange={(value) =>
			send({
				type: 'CHANGE_REST',
				payload: { rest: value }
			})}
	/>

	<TabataInputField
		id="numberOfCycles"
		label="Number of Cycles"
		value={$state.context.cycles}
		onChange={(value) =>
			send({
				type: 'CHANGE_CYCLES',
				payload: { cycles: value }
			})}
	/>

	<TabataInputField
		id="cooldown"
		label="Cooldown"
		value={$state.context.cooldown}
		onChange={(value) =>
			send({
				type: 'CHANGE_COOLDOWN',
				payload: { cooldown: value }
			})}
	/>
</div>

<footer
	class="fixed left-0 right-0 flex items-center justify-center gap-4 px-4 text-lg font-bold text-white rounded bottom-4 bg-emerald-400"
>
	<a href="/tabata-clock/run" class="flex items-center gap-2 py-4"
		>Start
		<IconPlayerPlay size={28} />
		<span class="font-bold">
			({secondsToMinutes(totalTime)})
		</span>
	</a>
</footer>

<style>
	footer {
		right: 50%;
		left: 50%;
		width: min-content;
		transform: translate(-50%, 0);
	}
</style>
