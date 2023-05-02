import readXlsxFile from 'read-excel-file/node';

import { SanityRoutines } from '$lib/models/SanityRoutines';
import { SanityTrainingSchema } from '$lib/models/SanityTrainingSchema';
import { parser } from '$lib/parser';

import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		try {
			const data = await request.formData();
			const xls = data.get('file') as File;
			const startDate = data.get('startDate') as string;
			const endDate = data.get('endDate') as string;

			const rows = await readXlsxFile(Buffer.from(await xls.arrayBuffer()));
			const plainRoutines = parser(rows, startDate, endDate);

			const sanityRoutines = new SanityRoutines();
			await sanityRoutines.createRoutines(plainRoutines);

			await SanityTrainingSchema.createTrainingSchema(plainRoutines, sanityRoutines.newRoutineIds);

			return { success: true };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}
} satisfies Actions;
