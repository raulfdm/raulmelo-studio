import { rowsMock } from '../../__fixtures__/rows';
import { createWeeklyRoutines } from './createWeeklyRoutines';
import { updateExercises } from './updateExercises';
import { updateSchedule } from './updateSchedule';

describe('fn: updateExercises', () => {
	it('updates all exercise correctly', () => {
		const weekRoutine = createWeeklyRoutines('2023-01-01', '2023-01-07');
		updateSchedule(rowsMock, weekRoutine);

		updateExercises(rowsMock, weekRoutine);

		expect(weekRoutine.map((r) => r.getObject())).toMatchSnapshot();
	});
});
