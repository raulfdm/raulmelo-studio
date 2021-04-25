/* eslint-disable @typescript-eslint/no-var-requires */
import { AlgoliaObject } from '../../types';
import { getPostsToAlgolia } from '../posts';

jest.mock('../../../utils/api', () => {
  const { postApi } = require('../__fixtures__/posts');

  return {
    api: {
      query: jest.fn(() => Promise.resolve(postApi)),
    },
  };
});

describe('fn: getPostsToAlgolia', () => {
  let indexName: string;
  let data: AlgoliaObject[];

  beforeEach(async () => {
    [indexName, data] = await getPostsToAlgolia();
  });

  it('returns expected index name', async () => {
    expect(indexName).toMatchInlineSnapshot(`"posts"`);
  });

  it('returns expected data structure', () => {
    data.forEach((obj) => {
      expect(obj).toEqual(
        expect.objectContaining({
          date: expect.any(String),
          objectID: expect.any(String),
          id: expect.any(String),
          excerpt: expect.any(String),
          locale: expect.any(String),
          title: expect.any(String),
          subtitle: expect.any(String),
          featured_image: expect.objectContaining({
            width: expect.any(Number),
            height: expect.any(Number),
            url: expect.any(String),
          }),
        }),
      );

      // Can't send entire content
      expect(obj).not.toEqual({
        content: expect.anything(),
      });
    });
  });
});
