import { gql } from 'graphql-request';

export const query = gql`
  query PostOrTilQuery($where: JSON) {
    tils(locale: "all", where: $where) {
      slug
      locale
    }
    posts(locale: "all", where: $where) {
      slug
      locale
    }
  }
`;
