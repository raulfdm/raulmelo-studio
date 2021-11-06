import { gql } from 'graphql-request';

export const query = gql`
  query {
    postTags {
      slug
    }
  }
`;
