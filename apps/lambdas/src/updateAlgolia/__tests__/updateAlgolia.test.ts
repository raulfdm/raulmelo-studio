import MockDate from 'mockdate';
import { updateAlgolia } from '../updateAlgolia';
import { ErrorFunctionReturn, SuccessFunctionReturn } from '../types';

import { getContentToAlgolia } from '../indexes/content';
import { pushAlgoliaData } from '../pushAlgoliaData';

jest.mock('../indexes/content');
jest.mock('../pushAlgoliaData');

const mockGetContentToAlgolia =
  getContentToAlgolia as unknown as jest.Mock<any>;
const mockPushAlgoliaData = pushAlgoliaData as unknown as jest.Mock<any>;

describe('fn: updateAlgolia', () => {
  beforeAll(() => {
    MockDate.set('2021-03-07');
  });

  describe('When success', () => {
    let result: SuccessFunctionReturn;

    const getContentMockData = ['post', [{ id: 1 }]];

    beforeEach(async () => {
      mockGetContentToAlgolia.mockReturnValue(getContentMockData);
      result = (await callConfiguredUpdateAlgolia()) as SuccessFunctionReturn;
    });

    it('calls pushAlgoliaData with the index updaters return', () => {
      expect(mockPushAlgoliaData).toHaveBeenCalledWith(...getContentMockData);
    });

    it('returns success object', () => {
      expect(result).toMatchInlineSnapshot(`
            Object {
              "body": "{\\"message\\":\\"Indexes updated!\\",\\"date\\":\\"2021-03-07T00:00:00.000Z\\"}",
              "statusCode": 200,
            }
          `);
    });
  });

  describe('When error', () => {
    let result: ErrorFunctionReturn;

    const originalConsoleError = console.error;
    const mockConsoleError = jest.fn();

    beforeEach(async () => {
      console.error = mockConsoleError;
      mockGetContentToAlgolia.mockRejectedValue({
        error: 'Something went wrong',
      });

      result = (await callConfiguredUpdateAlgolia()) as ErrorFunctionReturn;
    });

    afterAll(() => {
      console.error = originalConsoleError;
    });

    it('returns with error response ', () => {
      expect(result).toMatchInlineSnapshot(`
            Object {
              "body": "{\\"message\\":\\"Something went wrong. Check the logs\\",\\"date\\":\\"2021-03-07T00:00:00.000Z\\"}",
              "statusCode": 500,
            }
          `);
    });

    it('consoles the error', () => {
      expect(mockConsoleError).toMatchInlineSnapshot(`
        [MockFunction] {
          "calls": Array [
            Array [
              "Error while updating indexes:",
              undefined,
            ],
          ],
          "results": Array [
            Object {
              "type": "return",
              "value": undefined,
            },
          ],
        }
      `);
    });
  });
});

function callConfiguredUpdateAlgolia() {
  return updateAlgolia({
    headers: { authorization: process.env.AUTH_TOKEN },
  } as never);
}
