import { getEstimatedReadingTime } from '../getEstimatedReadingTime';
import { mockAllBlocks } from './__fixtures__/allBlocks';
import { mockRealPostBlocks } from './__fixtures__/fullPost';

describe('fn: getEstimatedReadingTime', () => {
  it('return the correct reading time', () => {
    expect(getEstimatedReadingTime(mockAllBlocks)).toBe(1);
    expect(getEstimatedReadingTime(mockRealPostBlocks)).toBe(7);
  });
});
