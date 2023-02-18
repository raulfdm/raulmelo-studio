<script lang="ts">
	import { onMount } from 'svelte';

	let times = 3;

	let result: number[] = [];
	let initialWeight = 10;
	let percentage = 0.8;
	let round = false;
	let firstElement: HTMLInputElement;

	onMount(() => {
		firstElement.focus();
	});

	function calculate() {
		let next: number = initialWeight;
		let nextResult = [];

		for (let index = 0; index < times; index++) {
			next = parseFloat((next * percentage).toPrecision(3));

			if (round) {
				next = Math.round(next);
			}

			nextResult.push(next);
		}

		result = nextResult;
	}

	function onFocus(event: FocusEvent) {
		const target = event.target as HTMLInputElement;
		target.select();
	}
</script>

<div class="space-y-2">
	<div class="px-2 space-y-2">
		<div class="form-control">
			<label class="label" for="initialWeight">
				<span class="label-text">Initial Weight</span>
			</label>
			<input
				type="number"
				id="initialWeight"
				inputmode="decimal"
				bind:value={initialWeight}
				placeholder="Weight"
				bind:this={firstElement}
				on:focus={onFocus}
			/>
		</div>

		<div class="form-control">
			<label class="label" for="percentage">
				<span class="label-text">Percentage</span>
			</label>
			<input
				type="number"
				inputmode="numeric"
				id="percentage"
				bind:value={percentage}
				placeholder="%"
				on:focus={onFocus}
			/>
		</div>

		<div class="form-control">
			<label class="label" for="timers">
				<span class="label-text">Times</span>
			</label>
			<input
				type="number"
				id="timers"
				inputmode="numeric"
				bind:value={times}
				placeholder="x"
				on:focus={onFocus}
			/>
		</div>
		<div class="form-control">
			<label class="cursor-pointer label" for="round">
				<span class="label-text">Round</span>
			</label>
			<input
				type="checkbox"
				id="round"
				bind:value={round}
				placeholder="x"
				class="checkbox checkbox-secondary"
			/>
		</div>
	</div>

	<button on:click={calculate} class="block mt-4 ml-auto btn btn-accent">Calculate</button>

	{#if result.length > 0}
		<div class="divider" />

		<section>
			<h2 class="my-3 text-xl font-bold text-center text-gray-600">Result</h2>

			<div class="overflow-x-auto">
				<table class="table mx-auto">
					<thead>
						<tr>
							<th>Order</th>
							<th>Weight(kg)</th>
						</tr>
					</thead>
					<tbody>
						{#each result as result, index}
							<tr>
								<th>{index + 1}</th>
								<td>{result}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
	{/if}
</div>

<style lang="postcss">
	.form-control label {
		@apply font-bold w-full max-w-xs;
	}

	.form-control input:not([type='checkbox']) {
		@apply w-full max-w-[200px] input input-bordered input-sm;
	}

	td,
	th {
		@apply text-center;
	}
</style>
