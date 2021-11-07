import algoliaserach from 'algoliasearch';

import { SETTINGS } from '../../config';
import { pushAlgoliaData } from '../pushAlgoliaData';

jest.mock('algoliasearch');

const mockSaveObjects = jest.fn();
const mockInitIndex = jest.fn(() => ({ saveObjects: mockSaveObjects }));
const mockAlgoliaSearch = algoliaserach as unknown as jest.Mock<any>;

describe('fn: pushAlgoliaData', () => {
  const data = [{ id: 1 }];
  const indexName = 'posts';

  beforeEach(async () => {
    mockAlgoliaSearch.mockImplementation(() => ({
      initIndex: mockInitIndex,
    }));

    await pushAlgoliaData(indexName, data);
  });

  it('setup algolia with SETTINGS', () => {
    expect(mockAlgoliaSearch).toHaveBeenCalledWith(
      SETTINGS.algolia.appId,
      SETTINGS.algolia.adminKey,
    );
  });

  it('setup index with the one sent', () => {
    expect(mockInitIndex).toHaveBeenCalledWith(indexName);
  });

  it('calls saveObjects with expected data', async () => {
    expect(mockSaveObjects).toHaveBeenCalledWith(data);
  });
});
