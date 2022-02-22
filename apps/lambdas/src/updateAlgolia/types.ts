export type SuccessFunctionReturn = {
  statusCode: 200;
  body: string;
};

export type ErrorFunctionReturn = {
  statusCode: 500;
  body: string;
};

export type FunctionReturn = SuccessFunctionReturn | ErrorFunctionReturn;
