import { getTrainingById } from '$lib/infrastructure/models/getTrainingById';

export async function load({ params }) {
	const { id } = params;

	const trainingRoutine = await getTrainingById(id);

	console.log(trainingRoutine);

	return {
		trainingRoutine
	};
}
