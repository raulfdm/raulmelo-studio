import { getAllExercises } from '$lib/infrastructure/models/getAllExercises';

export async function load() {
	const exercises = await getAllExercises();

	return {
		exercises
	};
}
