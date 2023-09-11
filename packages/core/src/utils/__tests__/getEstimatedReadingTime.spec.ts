import { describe, expect, it } from 'bun:test';

import { getEstimatedReadingTime } from '../getEstimatedReadingTime';
import { mockAllBlocks } from './__fixtures__/allBlocks';
import { mockRealPostBlocks } from './__fixtures__/fullPost';

describe('fn: getEstimatedReadingTime', () => {
  it('return the correct reading time', async () => {
    expect(await getEstimatedReadingTime(mockAllBlocks)).toBe(1);
    expect(await getEstimatedReadingTime(mockRealPostBlocks)).toBe(7);
  });
});
