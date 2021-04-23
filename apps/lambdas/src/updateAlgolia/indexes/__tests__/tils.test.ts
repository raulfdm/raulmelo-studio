/* eslint-disable @typescript-eslint/no-var-requires */
import { AlgoliaObject } from '../../types';
import { getTilsToAlgolia } from '../tils';

jest.mock('../../../utils/api', () => {
  const { tilsApiResponse } = require('../__fixtures__/tils');

  return {
    api: {
      query: jest.fn(() => Promise.resolve(tilsApiResponse)),
    },
  };
});

describe('fn: getPostsToAlgolia', () => {
  let indexName: string;
  let data: AlgoliaObject[];

  beforeEach(async () => {
    [indexName, data] = await getTilsToAlgolia();
  });

  it('returns expected index name', async () => {
    expect(indexName).toMatchInlineSnapshot(`"tils"`);
  });

  it('returns expected data structure', () => {
    data.forEach((obj) => {
      expect(obj).toStrictEqual(
        expect.objectContaining({
          excerpt: expect.any(String),
          id: expect.any(String),
          locale: expect.any(String),
          slug: expect.any(String),
          objectID: expect.any(String),
          publishedAt: expect.any(String),
          title: expect.any(String),
        }),
      );
    });
  });
});
