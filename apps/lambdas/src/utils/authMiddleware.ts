import { APIGatewayEvent, Context } from 'aws-lambda';
import { SETTINGS } from '../config';
import { Handler } from '../types';

/**
 * To prevent my functions being called from unknown people, this function
 * is just a guard which takes into account secrets.
 */
export function authMiddleware(handler: Handler) {
  return async function check(event: APIGatewayEvent, context?: Context) {
    if (event.headers?.authorization !== SETTINGS.authToken) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: 'Unauthorized request',
        }),
      };
    }

    return handler(event, context);
  };
}
