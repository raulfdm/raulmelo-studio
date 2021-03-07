import { serverResponse } from "./__fixtures__/serverResponse";
import { updateAlgolia } from "../.";
import axios, { AxiosStatic } from "axios";
import algolia from "algoliasearch";
import { ErrorFunctionReturn, SuccessFunctionReturn } from "../types";

jest.mock("axios");
jest.mock("algoliasearch");

const mockAxios = axios as AxiosStatic & {
  mockResolvedValue: Function;
  mockRejectedValue: Function;
};
const mockAlgolia = (algolia as unknown) as jest.Mock<any>;

const mockSaveObject = jest.fn();
const mockInitialIndex = jest.fn(() => ({ saveObjects: mockSaveObject }));

describe("fn: updateAlgolia", () => {
  describe("When success", () => {
    let result: SuccessFunctionReturn;

    beforeEach(async () => {
      mockAxios.mockResolvedValue({ data: serverResponse });
      mockAlgolia.mockReturnValue({ initIndex: mockInitialIndex });

      result = (await updateAlgolia()) as SuccessFunctionReturn;
    });

    describe("Algolia", () => {
      it("setups algolia correctly", async () => {
        expect(mockAlgolia).toHaveBeenCalledWith(
          process.env.ALGOLIA_APP_ID,
          process.env.ALGOLIA_ADMIN_KEY
        );

        expect(mockInitialIndex).toHaveBeenCalledWith(
          process.env.ALGOLIA_INDEX_NAME
        );
      });

      it("calls save", async () => {
        const [firstCall] = mockSaveObject.mock.calls;

        expect(firstCall).toMatchSnapshot();
      });
    });

    it("returns success object", () => {
      expect(result).toMatchInlineSnapshot(`
        Object {
          "body": "{\\"message\\":\\"Indexes updated!\\"}",
          "statusCode": 200,
        }
      `);
    });
  });

  describe("When error", () => {
    let result: ErrorFunctionReturn;
    const originalConsoleError = console.error;

    const mockConsoleError = jest.fn();

    beforeEach(async () => {
      console.error = mockConsoleError;
      mockAxios.mockRejectedValue({ error: "Timeout" });
      mockAlgolia.mockReturnValue({ initIndex: mockInitialIndex });

      result = (await updateAlgolia()) as ErrorFunctionReturn;
    });

    afterAll(() => {
      console.error = originalConsoleError;
    });

    it("returns with error response ", () => {
      expect(result).toMatchInlineSnapshot(`
        Object {
          "body": "{\\"message\\":\\"Something went wrong. Check the logs\\"}",
          "statusCode": 500,
        }
      `);
    });

    it("consoles the error", () => {
      expect(mockConsoleError).toMatchInlineSnapshot(`
        [MockFunction] {
          "calls": Array [
            Array [
              "Error while updating indexes:",
              Object {
                "error": "Timeout",
              },
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
