import { rowsMock } from '../../__fixtures__/rows';
import { createWeeklyRoutines } from './createWeeklyRoutines';
import { updateCardioInfo } from './updateCardioInfo';

describe('fn: updateCardioInfo', () => {
	it('update all weekly routines with the cardio information', () => {
		const weekRoutine = createWeeklyRoutines('2023-01-01', '2023-01-07');

		updateCardioInfo(rowsMock, weekRoutine);

		expect(weekRoutine[0].cardioTime).toBe(10);
		expect(weekRoutine[1].cardioTime).toBe(40);
		expect(weekRoutine[2].cardioTime).toBe(10);
		expect(weekRoutine[3].cardioTime).toBe(40);
		expect(weekRoutine[4].cardioTime).toBe(10);
		expect(weekRoutine[5].cardioTime).toBe(0);
		expect(weekRoutine[6].cardioTime).toBe(10);
	});
});
