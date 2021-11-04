import { gql } from 'graphql-request';

export const query = gql`
  query UsesPage($locale: String) {
    uses: use(locale: $locale) {
      locale
      title
      seo {
        title
        description
      }
      content
    }
  }
`;
