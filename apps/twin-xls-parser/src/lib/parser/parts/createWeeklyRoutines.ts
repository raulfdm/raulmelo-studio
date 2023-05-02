import dayjs from 'dayjs';

import { Routine } from '../../models/Routine';

export function createWeeklyRoutines(startDate: string, endDate: string) {
	const startDay = dayjs(startDate);
	const endDay = dayjs(endDate);

	const diff = endDay.diff(startDay, 'day') + 1; // +1 because we want to include the end date

	const result: Routine[] = [];

	for (let currDay = 0; currDay < diff; currDay++) {
		result.push(new Routine(startDay.add(currDay, 'day').format('YYYY-MM-DD')));
	}

	return result;
}
