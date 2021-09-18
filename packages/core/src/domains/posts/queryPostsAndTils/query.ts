export const query = `
  query Home($locale: String, $numberOfPosts: Int) {
    posts(locale: $locale, sort: "date:desc", limit: $numberOfPosts) {
      id
      slug
      date
      title
      subtitle
      locale
      description
      featured_image {
        width
        height
        url
      }
      post_tags {
        ...tagsFragment
      }
    }

    tils(locale: $locale, sort: "publishedAt:desc", limit: $numberOfPosts) {
      id
      title
      publishedAt
      locale
      slug
      tags {
        ...tagsFragment
      }
    }
  }

  fragment tagsFragment on PostTag {
    slug
    id
    name
  }
`;
