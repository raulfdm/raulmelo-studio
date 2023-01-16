import { getTrainingById } from '$lib/infrastructure/models/getTrainingById';

import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { id } = params;

	const trainingRoutine = await getTrainingById(id);

	return {
		trainingRoutine
	};
}) satisfies PageLoad;
