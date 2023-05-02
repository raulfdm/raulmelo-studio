import { rowsMock } from '../../__fixtures__/rows';
import { createWeeklyRoutines } from './createWeeklyRoutines';
import { updateSchedule } from './updateSchedule';

describe('fn: updateSchedule', () => {
	it('updates all routines with the column name', () => {
		const weekRoutine = createWeeklyRoutines();

		updateSchedule(rowsMock, weekRoutine);

		expect(weekRoutine[0].title).toBe('Treino A');
		expect(weekRoutine[1].title).toBe('Cardio');
		expect(weekRoutine[2].title).toBe('Treino B');
		expect(weekRoutine[3].title).toBe('Cardio');
		expect(weekRoutine[4].title).toBe('Treino C');
		expect(weekRoutine[5].title).toBe('Treino D');
	});
});
