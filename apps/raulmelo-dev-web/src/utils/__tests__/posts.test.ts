import { sortPostsAscending } from '../posts';

describe('fn: sortPostsAscending', () => {
  it('sort post ascending', () => {
    const result = [
      {
        id: 2,
        date: '2019-10-10',
      } as never,
      {
        id: 3,
        date: '2020-09-16',
      } as never,
      {
        id: 1,
        date: '2018-01-20',
      } as never,
    ].sort(sortPostsAscending);

    expect(result).toStrictEqual([
      {
        id: 1,
        date: '2018-01-20',
      },
      {
        id: 2,
        date: '2019-10-10',
      },
      {
        id: 3,
        date: '2020-09-16',
      },
    ]);
  });
});
