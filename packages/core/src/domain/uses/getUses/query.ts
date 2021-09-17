export const query = `
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
