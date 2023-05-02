import type { Row } from 'read-excel-file';

import type { PlainRoutine, Routine } from '../models/Routine';
import { createWeeklyRoutines } from './parts/createWeeklyRoutines';
import { updateCardioInfo } from './parts/updateCardioInfo';
import { updateExercises } from './parts/updateExercises';
import { updateSchedule } from './parts/updateSchedule';

export function parser(rows: Row[], startDate: string, endDate: string): PlainRoutine[] {
	const weekRoutine: Routine[] = createWeeklyRoutines(startDate, endDate);

	updateSchedule(rows, weekRoutine);
	updateCardioInfo(rows, weekRoutine);
	updateExercises(rows, weekRoutine);

	return weekRoutine.map((r) => r.getObject());
}
