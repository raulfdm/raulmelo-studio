import { gql } from 'graphql-request';

export const query = gql`
  query Tils($where: JSON) {
    tils(where: $where, locale: "all") {
      id
      publishedAt
      title
      locale
      slug
      content
      tags {
        id
        name
        slug
      }
    }
  }
`;
