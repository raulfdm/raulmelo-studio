import { sanitizePosts } from './apiSanitizer';

import { data, expectedData } from './__mocks__/postData';

describe('fn: sanitizePosts', () => {
  it('pick up only the needed data', () => {
    expect(sanitizePosts(data as any)).toEqual(expectedData);
  });
});
