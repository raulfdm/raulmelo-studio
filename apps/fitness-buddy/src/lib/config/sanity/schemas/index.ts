import { youtubeVideoField } from '@raulmelo/sanity-core';

import { exerciseSchema } from './exercise';
import { measurementSchema } from './measurements';
import { trainingRoutineSchema } from './routine';
import { trainingSchema } from './training';

export const schema = {
	name: `default`,
	types: [
		exerciseSchema,
		measurementSchema,
		trainingRoutineSchema,
		trainingSchema,
		youtubeVideoField
	]
};
