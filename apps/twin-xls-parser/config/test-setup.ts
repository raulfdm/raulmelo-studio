beforeAll(() => {
	vi.useFakeTimers().setSystemTime(new Date('2023-01-01'));
});

afterAll(() => {
	vi.useRealTimers();
});
