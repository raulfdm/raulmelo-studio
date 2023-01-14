<script lang="ts">
	import { onDestroy, beforeUpdate, onMount } from 'svelte';

	import PlayIcon from '$lib/components/Icons/PlayIcon.svelte';
	import PauseIcon from '$lib/components/Icons/PauseIcon.svelte';

	import { secondsToMinutes } from '$lib/utils/secondsToMinutes';
	import FastForwardIcon from '$lib/components/Icons/FastForwardIcon.svelte';
	import RewindIcon from '$lib/components/Icons/RewindIcon.svelte';
	import {
		persistClockInfo,
		continueTimer,
		canRewind,
		canFastForward,
		readTrainingStore,
		clockMachine
	} from '$lib/stores/old/clockMachine';
	import type { ClockMachineState } from '$lib/stores/old/clockMachine';
	import { activityStore } from '$lib/stores/old/activity';
	import TrashIcon from '$lib/components/Icons/TrashIcon.svelte';
	import { useMachine } from '@xstate/svelte';

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

	console.log(clockState);
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

<div class="clockWrapper">
	<div class="info">
		<section>
			<h3>Series</h3>
			<span>{currentClockNew.remainingSeries}/{currentClockNew.totalSeries}</span>
		</section>

		<section>
			<h3>Time left</h3>
			<span>{secondsToMinutes($state.context.remainingRest)}</span>
		</section>
	</div>

	<div class="actions">
		<button
			class="action"
			disabled={isRewindButtonDisabled}
			on:click={() => {
				send('REWIND');
			}}
		>
			<RewindIcon size="60" />
		</button>

		<button
			class="action start"
			on:click={() => {
				send('TOGGLE');
			}}
		>
			{#if clockState === 'pause' || clockState === 'idle'}
				<PlayIcon size="80" />
			{:else}
				<PauseIcon size="80" />
			{/if}
		</button>

		<button
			class="action"
			disabled={isFastForwardButtonDisabled}
			on:click={() => {
				send('FAST_FORWARD');
			}}
		>
			<FastForwardIcon size="60" />
		</button>
	</div>

	<section class="resetWrapper">
		<h3 class="sectionTitle">Reset Counter</h3>
		<button
			class="reset"
			disabled={isResetButtonDisabled}
			on:click={() => {
				if (confirm('Are you sure you want to clear the clock?')) {
					send('RESET');
				}
			}}
		>
			<TrashIcon size="32" />
		</button>
	</section>
</div>

<style lang="postcss">
	.clockWrapper {
		@apply flex flex-col h-full justify-around;
	}
	.info {
		@apply space-y-4;
	}
	h3 {
		@apply text-center text-lg font-bold mb-2;
	}

	span {
		@apply text-center font-bold mb-2 text-6xl block text-gray-500;
		font-variant-numeric: tabular-nums;
	}
	.actions {
		@apply mt-14 w-full grid grid-flow-col;
	}

	.action {
		@apply text-blue-400;
		@apply justify-self-center;
	}

	.action:disabled {
		@apply opacity-50;
	}

	.start {
		@apply text-pink-600;
	}

	.resetWrapper {
		@apply grid place-items-center mt-12;
	}

	.reset {
		@apply text-gray-400;
	}

	.reset:disabled {
		@apply opacity-50;
	}
</style>
