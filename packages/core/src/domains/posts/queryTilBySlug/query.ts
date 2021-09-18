export const query = `
  query Tils($where: JSON) {
    tils(where: $where) {
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
