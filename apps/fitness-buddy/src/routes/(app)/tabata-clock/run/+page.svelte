<script lang="ts">
	import IconPlayerPause from '@tabler/icons-svelte/dist/svelte/icons/IconPlayerPause.svelte';
	import IconPlayerPlay from '@tabler/icons-svelte/dist/svelte/icons/IconPlayerPlay.svelte';
	import IconPlayerTrackNext from '@tabler/icons-svelte/dist/svelte/icons/IconPlayerTrackNext.svelte';
	import IconPlayerTrackPrev from '@tabler/icons-svelte/dist/svelte/icons/IconPlayerTrackPrev.svelte';
	import { useMachine } from '@xstate/svelte';

	import { goto } from '$app/navigation';
	import { createTabataClock } from '$lib/stores/tabata-clock';
	import { tabataConfigService } from '$lib/stores/tabata-config';
	import { secondsToMinutes } from '$lib/utils/secondsToMinutes';

	if ($tabataConfigService.changed === false || $tabataConfigService.changed === undefined) {
		goto('/tabata-clock');
	}

	const machine = createTabataClock($tabataConfigService.context);
	const { state, send } = useMachine(machine, {
		actions: {
			onFinished: () => {
				setTimeout(() => {
					goto('/tabata-clock');
				}, 3000);
			},
			onTick: (context) => {
				if (context.elapsed === 3) {
					return new Audio('/sounds/Warning2.ogg').play();
				}

				if (context.elapsed === 0) {
					const nextItemIndex = context._actionIndex + 1;
					const nextItem = context.listOfActions[nextItemIndex];

					switch (nextItem.type) {
						case 'workout': {
							return new Audio('/sounds/Work.ogg').play();
						}
						case 'rest': {
							return new Audio('/sounds/Rest.ogg').play();
						}
						case 'final': {
							return new Audio('/sounds/SessionComplete.ogg').play();
						}
					}
				}
			}
		}
	});
</script>

<div
	class="absolute top-0 bottom-0 left-0 right-0 p-4 overflow-hidden clock"
	data-state={$state.context.currentAction.type}
>
	<header class="h-[40%]">
		<section class="flex">
			<h1 class="flex-1 text-5xl text-center">
				{$state.context.currentAction.label}
			</h1>
			<button on:click={() => send('TOGGLE')}>
				{#if $state.matches('running')}
					<IconPlayerPause size={48} />
				{:else}
					<IconPlayerPlay size={48} />
				{/if}
			</button>
		</section>
		<span class="block text-center text-[14rem] leading-none">{$state.context.elapsed}</span>
	</header>

	<ul class="overflow-auto h-[50%]">
		{#each $state.context.listOfActions as action, index}
			<li
				class="flex items-center justify-between gap-4 px-4 py-2 text-xl border-b border-white"
				class:active={$state.context._actionIndex === index}
			>
				<span>{action.label}</span>
				<span>{secondsToMinutes(action.duration)}</span>
			</li>
		{/each}
	</ul>

	<div class="flex justify-between mt-4 h-[10%] items-center">
		<button on:click={() => send('BACKWARD')}>
			<IconPlayerTrackPrev size={42} />
		</button>
		<span class="text-4xl">
			{$state.context._actionIndex + 1} / {$state.context.listOfActions.length}
		</span>
		<button on:click={() => send('FORWARD')}>
			<IconPlayerTrackNext size={42} />
		</button>
	</div>
</div>

<style lang="postcss">
	.clock {
		@apply text-white transition-colors;
	}

	.clock[data-state='prepare'] {
		@apply bg-green-700;
	}

	.clock[data-state='prepare'] .active {
		@apply bg-green-900;
	}
	.clock[data-state='workout'] {
		@apply bg-red-700;
	}

	.clock[data-state='workout'] .active {
		@apply bg-red-900;
	}

	.clock[data-state='rest'] {
		@apply bg-blue-700;
	}

	.clock[data-state='rest'] .active {
		@apply bg-blue-900;
	}

	.clock[data-state='final'] {
		@apply bg-gray-900;
	}
</style>
