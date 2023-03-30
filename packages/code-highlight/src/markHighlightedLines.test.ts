import { describe, it, expect } from 'vitest';

import { getLinesToMark } from './markHighlightedLines';

describe('getLinesToMark', () => {
  it('should return empty array if no lines are passed', () => {
    expect(getLinesToMark()).toEqual([]);
  });

  it('returns an array of lines lines', () => {
    expect(getLinesToMark('1,2,3')).toEqual([1, 2, 3]);
    expect(getLinesToMark('1,2')).toEqual([1, 2]);
    expect(getLinesToMark('30,40,42,44')).toEqual([30, 40, 42, 44]);
  });

  it('considers range of lines', () => {
    expect(getLinesToMark('1-3')).toEqual([1, 2, 3]);
    expect(getLinesToMark('1-3,5-7')).toEqual([1, 2, 3, 5, 6, 7]);
  });
});
