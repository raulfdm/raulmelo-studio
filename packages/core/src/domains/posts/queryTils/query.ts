export const query = `
query Tils($locale: String!) {
  tils(locale: $locale, sort: "publishedAt:DESC") {
    id
    publishedAt
    title
    locale
    slug
    tags {
      id
      name
      slug
    }
  }
}
`;
