import { describe, expect,it } from 'vitest';

import { mockAllBlocks } from './__fixtures__/allBlocks';
import { mockRealPostBlocks } from './__fixtures__/fullPost';
import { getEstimatedReadingTime } from './getEstimatedReadingTime';

describe('fn: getEstimatedReadingTime', () => {
  it('return the correct reading time', async () => {
    expect(await getEstimatedReadingTime(mockAllBlocks)).toBe(1);
    expect(await getEstimatedReadingTime(mockRealPostBlocks)).toBe(7);
  });
});
