import { data, dataExpectedData } from './__mocks__/posts/postData';
import { sortDescPostsByDate } from './posts';

describe('fn: sortDescPostsByDate', () => {
  it('sort posts desc', () => {
    expect(sortDescPostsByDate(data as any)).toStrictEqual(dataExpectedData);
  });
});
