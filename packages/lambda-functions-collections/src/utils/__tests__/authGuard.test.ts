import { authMiddleware } from "../authMiddleware";

describe("fn: authMiddleware", () => {
  it("returns 401 if token does not match", async () => {
    const guardedFunction = authMiddleware(jest.fn());

    expect(await guardedFunction({ headers: {} } as any))
      .toMatchInlineSnapshot(`
      Object {
        "body": "{\\"message\\":\\"Unauthorized request\\"}",
        "statusCode": 401,
      }
    `);

    expect(
      await guardedFunction({
        headers: {
          authorization: "heheheh",
        },
      } as any)
    ).toMatchInlineSnapshot(`
    Object {
      "body": "{\\"message\\":\\"Unauthorized request\\"}",
      "statusCode": 401,
    }
  `);
  });

  it("calls guarded function if token is correct", async () => {
    const lambdaFunction = jest.fn();

    const guardedFunction = authMiddleware(lambdaFunction);

    const event = {
      headers: {
        authorization: process.env.AUTH_TOKEN,
      },
    } as any;

    const context = {
      someContext: "123",
    } as any;

    await guardedFunction(event, context);

    expect(lambdaFunction).toHaveBeenCalledTimes(1);
    expect(lambdaFunction).toHaveBeenCalledWith(event, context);
  });
});
