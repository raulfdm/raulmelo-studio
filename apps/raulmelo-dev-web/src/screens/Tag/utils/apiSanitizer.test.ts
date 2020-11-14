import { sanitizePostTag } from './apiSanitizer';
import { data, expectedData } from './__mocks__/tagData';

describe('fn: sanitizePostTag', () => {
  it('sanitize tag api data', () => {
    expect(sanitizePostTag(data as any)).toEqual(expectedData);
  });
});
