<script lang="ts">
	import dayjs from 'dayjs';

	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';

	let isSubmitting = false;
	let startDate: string;
	let endDate: string;
	let minEndDate: string;
	export let form: ActionData;

	$: difference = getDifference(startDate, endDate);

	function handleSubmit() {
		isSubmitting = true;
	}

	function handleStartDate(
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		startDate = event.currentTarget.value;
		minEndDate = dayjs(event.currentTarget.value).add(1, 'day').format('YYYY-MM-DD');
	}

	function handleEndDate(
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		endDate = event.currentTarget.value;
	}

	function getDifference(startDate: string, endDate: string) {
		if (startDate && endDate) {
			return dayjs(endDate).diff(dayjs(startDate), 'day') + 1; // +1 to include the end date
		}

		return '';
	}
</script>

<main class="grid h-full place-items-center">
	{#if form}
		{#if form.success}
			<div class="shadow-lg alert alert-success w-96">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="flex-shrink-0 w-6 h-6 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>File imported successfully</span>
				</div>
			</div>
		{:else}
			<div class="shadow-lg alert alert-error w-96">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="flex-shrink-0 w-6 h-6 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>Something went wrong. Please check the logs</span>
				</div>
			</div>
		{/if}
	{:else}
		<div class="max-w-lg">
			<form
				method="post"
				enctype="multipart/form-data"
				class="flex flex-col justify-end gap-4 place-items-end"
				use:enhance={handleSubmit}
			>
				<div class="grid grid-cols-2 gap-2">
					<div class="w-full form-control">
						<label class="label" for="startDate">
							<span class="label-text">Start Date</span>
						</label>
						<input
							id="startDate"
							name="startDate"
							placeholder="Type here"
							class="w-full input input-bordered"
							type="date"
							required
							on:change={handleStartDate}
							disabled={isSubmitting}
						/>
					</div>

					<div class="w-full form-control">
						<label class="label" for="endDate">
							<span class="label-text">End Date</span>
						</label>
						<input
							id="endDate"
							name="endDate"
							placeholder="Type here"
							class="w-full input input-bordered"
							type="date"
							required
							on:change={handleEndDate}
							min={minEndDate}
							disabled={!minEndDate || isSubmitting}
						/>
					</div>
					{#if difference}
						<div class="col-span-2 shadow-lg alert">
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									class="flex-shrink-0 w-6 h-6 stroke-info"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/></svg
								>
								Difference: {difference} days
							</div>
						</div>
					{/if}
				</div>

				<div class="w-full form-control">
					<label class="label" for="endDate">
						<span class="label-text">Arquivo</span>
					</label>
					<input
						class="w-full file-input"
						name="file"
						type="file"
						accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
						required
						disabled={isSubmitting}
					/>
				</div>

				<button
					type="submit"
					class="btn btn-outline btn-secondary max-w-fit"
					disabled={isSubmitting}>Parse</button
				>
			</form>
			{#if isSubmitting}
				<progress class="mt-8 progress progress-info" />
			{/if}
		</div>
	{/if}
</main>
