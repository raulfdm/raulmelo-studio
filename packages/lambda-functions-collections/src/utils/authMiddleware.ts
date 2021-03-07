import { APIGatewayEvent, Context } from "aws-lambda";
import { Handler } from "../types";

/**
 * To prevent my functions being called from unknown people, this function
 * is just a guard which takes into account secrets.
 */
export function authMiddleware(handler: Handler) {
  return async function check(event: APIGatewayEvent, context?: Context) {
    if (event.headers?.authorization !== process.env.AUTH_TOKEN) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: "Unauthorized request",
        }),
      };
    }

    return handler(event, context);
  };
}
