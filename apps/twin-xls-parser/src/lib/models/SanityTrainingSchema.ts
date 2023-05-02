import { sanityClient } from '$lib/config/sanity';

import type { PlainRoutine } from './Routine';

export class SanityTrainingSchema {
	static async createTrainingSchema(parsedRoutines: PlainRoutine[], routineIds: string[]) {
		await sanityClient.create({
			_type: 'trainingSchema',
			title: '(IMPORTED) Semana ?',
			startDate: parsedRoutines[0].date,
			endDate: parsedRoutines[parsedRoutines.length - 1].date,
			schema: routineIds.map((id) => ({
				_type: 'routine',
				_ref: id
			}))
		});
	}
}
