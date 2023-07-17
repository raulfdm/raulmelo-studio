<script lang="ts">
	import { browser } from '$app/environment';
	import { body } from '$lib/utils/dom';

	import type { ITab } from '../../../stores/old/activity';
	import { activityActions,activityStore } from '../../../stores/old/activity';
	import Clock from './components/Clock.svelte';
	import Content from './components/Content.svelte';
	import DropSetCalculator from './components/DropSetCalculator.svelte';
	import TrainingInfo from './components/TrainingInfo.svelte';
	let overlayEl: HTMLDivElement;

	$: {
		if (browser) {
			if ($activityStore.state === 'open' && overlayEl) {
				body.preventScroll();
				overlayEl.scrollIntoView();
			}

			if ($activityStore.state === 'closed') {
				body.allowScroll();
			}
		}
	}

	export const tabs: { value: ITab; label: string }[] = [
		{
			label: 'Clock',
			value: 'clock'
		},
		{
			label: 'Content',
			value: 'content'
		},
		{
			label: 'Drop Set Calculator',
			value: 'drop-set-calculator'
		}
	];
</script>

{#if $activityStore.state === 'open'}
	<div class="absolute top-0 bottom-0 left-0 right-0 mx-auto">
		<div class="overlay" id="clock-overlay" bind:this={overlayEl} />
		<div class="fixed bottom-0 bg-white left-4 right-4 wrapper">
			<button on:click={activityActions.close} class="closeButton">Close</button>

			<TrainingInfo training={$activityStore.currentTraining} />

			<hr class="my-2" />

			<section class="tabContent">
				{#if $activityStore.currentTabActive === 'clock'}
					<Clock />
				{:else if $activityStore.currentTabActive === 'content'}
					<Content />
				{:else if $activityStore.currentTabActive === 'drop-set-calculator'}
					<DropSetCalculator />
				{/if}
			</section>

			<nav class="btm-nav">
				{#each tabs as tab}
					<button
						class="tab"
						class:tabActive={$activityStore.currentTabActive === tab.value}
						on:click={() => activityActions.setCurrentTab(tab.value)}
					>
						{tab.label}
					</button>
				{/each}
			</nav>
		</div>
	</div>
{/if}

<style lang="postcss">
	.overlay {
		@apply absolute top-0 bottom-0 right-0 left-0;
		background-color: rgba(0, 0, 0, 0.7);
	}
	.wrapper {
		@apply bg-base-100;
		@apply rounded-t-2xl p-4 pb-0;
		height: clamp(500px, 630px, 90%);
		@apply flex flex-col;
	}

	.closeButton {
		@apply absolute -top-8;
		@apply px-4 py-2;
		@apply rounded-t-full;
		@apply bg-base-100;
		@apply text-primary-content;
		right: calc(50% - 38px);
	}

	.btm-nav {
		position: initial;
		scrollbar-width: none;
	}

	.btm-nav::-webkit-scrollbar {
		display: none;
	}

	.tab {
		@apply h-full;
	}

	.tabActive {
		@apply border-t-2 border-primary text-primary;
	}

	.tabContent {
		@apply pt-4 pb-8 flex-1 overflow-y-auto;
	}
</style>
