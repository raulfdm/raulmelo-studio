import { APIGatewayEvent, Context } from "aws-lambda";

export type FunctionReturn = {
  statusCode: number;
  body: string;
};
export type Handler = (
  event: APIGatewayEvent,
  context?: Context
) => Promise<FunctionReturn>;
