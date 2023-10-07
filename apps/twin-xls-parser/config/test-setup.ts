import { beforeAll, setSystemTime } from 'bun:test';

beforeAll(() => {
	setSystemTime(new Date('2023-01-01'));
});
