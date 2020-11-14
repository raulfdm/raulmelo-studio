import { PostsApiData } from '@types-api';
import { sanitizePosts } from './apiSanitizer';

import { data, expectedData } from './__mocks__/data';

describe('fn: sanitizePosts', () => {
  it('pick up only the needed data', () => {
    expect(sanitizePosts(data as PostsApiData)).toEqual(expectedData);
  });
});
