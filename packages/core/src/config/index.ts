import { GraphQLClient } from 'graphql-request';

const API_URL =
  globalThis.__API_ENDPOINT__ ||
  process.env.API_ENDPOINT ||
  'http://localhost:1337';

export const client = new GraphQLClient(`${API_URL}/graphql`);
