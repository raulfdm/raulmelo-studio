import { sanityClient } from '$lib/config/sanity';

import { RemoteExercise } from './RemoteExercise';
import type { PlainRoutine } from './Routine';

export class SanityRoutines {
	#newRoutineIds: string[] = [];
	#remoteExercises: RemoteExercise;

	constructor() {
		this.#remoteExercises = new RemoteExercise();
	}

	get newRoutineIds() {
		return [...this.#newRoutineIds];
	}

	async createRoutines(plainRoutines: PlainRoutine[]) {
		await this.#remoteExercises.loadExercises();

		for (const routine of plainRoutines) {
			const createdRoutine = await sanityClient.createIfNotExists(
				{
					_id: routine.id,
					_type: 'trainingRoutine',
					routine: {
						_id: routine.id,
						name: `TEST_${routine.title}`,
						description: routine.subtitle,
						date: routine.date,
						training: routine.exercises
							? routine.exercises.map((exercise) => ({
									series: exercise.series,
									repetitions: exercise.reps,
									restTime: exercise.rest,
									advancedTechnique: exercise.advancedTechnique,
									exercise: {
										_type: 'reference',
										_ref: this.#remoteExercises.getExerciseId(exercise.name)
									}
							  }))
							: undefined,
						cardio: {
							time: routine.cardioTime
						}
					}
				},
				{
					autoGenerateArrayKeys: true // IMPORTANT to avoid _ref problems
				}
			);

			this.#newRoutineIds.push(createdRoutine._id);
			console.log(`Created routine ${routine.title}`);
		}
	}
}
