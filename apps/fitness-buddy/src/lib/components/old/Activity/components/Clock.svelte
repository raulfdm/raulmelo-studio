<script lang="ts">
	import IconPlayerPause from '@tabler/icons-svelte/dist/svelte/icons/IconPlayerPause.svelte';
	import IconPlayerPlay from '@tabler/icons-svelte/dist/svelte/icons/IconPlayerPlay.svelte';
	import IconPlayerTrackNext from '@tabler/icons-svelte/dist/svelte/icons/IconPlayerTrackNext.svelte';
	import IconPlayerTrackPrev from '@tabler/icons-svelte/dist/svelte/icons/IconPlayerTrackPrev.svelte';
	import IconTrash from '@tabler/icons-svelte/dist/svelte/icons/IconTrash.svelte';
	import { useMachine } from '@xstate/svelte';
	import { beforeUpdate, onDestroy, onMount } from 'svelte';

	import { activityStore } from '$lib/stores/old/activity';
	import {
		canFastForward,
		canRewind,
		clockMachine,
		type ClockMachineState,
		continueTimer,
		persistClockInfo,
		readTrainingStore	} from '$lib/stores/old/clockMachine';

	const clockMachineService = useMachine(clockMachine, {} as any);

	clockMachineService.service.start();

	const { send, state } = clockMachineService;

	$: currentClockNew = $state.context;
	$: clockState = $state.value;
	$: isRewindButtonDisabled = clockState !== 'idle' || !canRewind(currentClockNew);
	$: isFastForwardButtonDisabled = clockState !== 'idle' || !canFastForward(currentClockNew);
	$: isResetButtonDisabled = clockState === 'running' || clockState === 'unset';

	onMount(() => {
		document.body.scrollTop = 0;
	});

	beforeUpdate(() => {
		clockMachineService.service.start();

		const persistedStore = readTrainingStore() || {};

		const persistedContext = persistedStore[$activityStore.currentTraining._key];

		if (persistedContext) {
			clockMachineService.send({
				type: 'SET_ACTIVITY',
				payload: persistedContext
			});

			if (persistedContext.state === 'running') {
				clockMachineService.send({
					type: 'RUN'
				});
			}
		} else {
			clockMachineService.send({
				type: 'SET_ACTIVITY',
				payload: {
					exerciseId: $activityStore.currentTraining._key,
					totalRest: $activityStore.currentTraining.restTime,
					totalSeries: $activityStore.currentTraining.series
				}
			});
		}
	});

	onDestroy(() => {
		const clockContextWithState = {
			...currentClockNew,
			state: clockState as ClockMachineState
		};

		persistClockInfo(clockContextWithState);

		if (clockState === 'running') {
			continueTimer(clockContextWithState);
		}
	});
</script>

<div class="flex flex-col justify-around h-full">
	<div class="space-y-4">
		<section>
			<h3>Series</h3>
			<span class="text-5xl countdown">
				<span style={`--value:${currentClockNew.remainingSeries};`} />
				/
				<span style={`--value:${currentClockNew.totalSeries};`} />
			</span>
		</section>

		<section>
			<h3>Time left</h3>
			<span class="text-7xl countdown">
				<span style={`--value:${$state.context.remainingRest};`} />
			</span>
		</section>
	</div>

	<div class="grid w-full grid-flow-col mt-14 actions">
		<button
			class="action"
			disabled={isRewindButtonDisabled}
			on:click={() => {
				send('REWIND');
			}}
		>
			<IconPlayerTrackPrev size={48} />
		</button>

		<button
			class="action start"
			on:click={() => {
				send('TOGGLE');
			}}
		>
			{#if clockState === 'pause' || clockState === 'idle'}
				<IconPlayerPlay size={64} />
			{:else}
				<IconPlayerPause size={64} />
			{/if}
		</button>

		<button
			class="action"
			disabled={isFastForwardButtonDisabled}
			on:click={() => {
				send('FAST_FORWARD');
			}}
		>
			<IconPlayerTrackNext size={48} />
		</button>
	</div>

	<section class="grid mt-12 place-items-center">
		<h3>Reset Counter</h3>
		<button
			class="text-gray-400 disabled:opacity-50"
			disabled={isResetButtonDisabled}
			on:click={() => {
				if (confirm('Are you sure you want to clear the clock?')) {
					send('RESET');
				}
			}}
		>
			<IconTrash size={32} />
		</button>
	</section>
</div>

<style lang="postcss">
	section > h3 {
		@apply text-center text-lg font-bold mb-2;
	}

	.countdown {
		@apply text-center font-bold text-gray-500 font-mono block;
		font-variant-numeric: tabular-nums;
	}

	.actions button {
		@apply text-accent-focus;
		@apply justify-self-center;
	}
	.actions button.start {
		@apply text-secondary-focus;
	}
	.actions button:disabled {
		@apply opacity-50;
	}
</style>
