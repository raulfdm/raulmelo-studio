export type SuccessFunctionReturn = {
  statusCode: 200;
  body: string;
};

export type ErrorFunctionReturn = {
  statusCode: 500;
  body: string;
};

export type FunctionReturn = SuccessFunctionReturn | ErrorFunctionReturn;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AlgoliaObject = { [key: string]: any };

export type AlgoliaObjectList = AlgoliaObject[];

export type PushAlgoliaTuple = [index: string, algoliaData: AlgoliaObject[]];
