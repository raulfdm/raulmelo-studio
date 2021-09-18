export const query = `
  query Home($locale: String) {
    posts(locale: $locale, sort: "date:desc") {
      id
      locale
      slug
      date
      title
      subtitle
      description
      featured_image {
        width
        height
        url
      }
      post_serie {
        slug
        name
        id
      }
      post_tags {
        slug
        id
        name
      }
    }
  }
`;
