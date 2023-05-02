import { describe, expect, it } from 'vitest';

import { rowsMock } from '../__fixtures__/rows';
import { parser } from '.';

describe('fn: parser', () => {
	it('parses the raw XLS data into the expected shape', () => {
		const result = parser(rowsMock);
		expect(result).toMatchSnapshot();
	});
});
