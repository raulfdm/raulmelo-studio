/* eslint-disable @typescript-eslint/no-var-requires */
import { AlgoliaObject } from '../../types';
import { getContentToAlgolia } from '../content';

jest.mock('../../../utils/api', () => {
  const { postApi } = require('../__fixtures__/content');

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
    [indexName, data] = await getContentToAlgolia();
  });

  it('returns expected index name', async () => {
    expect(indexName).toMatchInlineSnapshot(`"posts"`);
  });

  it('returns expected data structure', () => {
    data.forEach((obj) => {
      expect(obj).toMatchSnapshot();

      // Can't send entire content
      expect(obj).not.toEqual({
        content: expect.anything(),
      });
    });
  });
});
