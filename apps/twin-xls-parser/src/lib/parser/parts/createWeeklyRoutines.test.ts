import { createWeeklyRoutines } from './createWeeklyRoutines';

describe('fn: createWeeklyRoutines', () => {
	it('return an array with 7 elements (7 days of a week)', () => {
		const result = createWeeklyRoutines('2023-01-01', '2023-01-07');
		expect(result).toHaveLength(7);
	});

	it('every element should be a day after the previous', () => {
		const result = createWeeklyRoutines('2023-01-08', '2023-01-14');

		expect(result[0].date).toBe('2023-01-08');
		expect(result[1].date).toBe('2023-01-09');
		expect(result[2].date).toBe('2023-01-10');
		expect(result[3].date).toBe('2023-01-11');
		expect(result[4].date).toBe('2023-01-12');
		expect(result[5].date).toBe('2023-01-13');
		expect(result[6].date).toBe('2023-01-14');
	});
});
