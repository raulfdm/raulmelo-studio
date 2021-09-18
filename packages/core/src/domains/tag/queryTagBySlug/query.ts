export const query = `
  query TagPage($slug: String, $locale: String) {
    postTags(where: { slug: $slug }) {
      id
      slug
      name

      # TIL
      til_posts(sort: "publishedAt:desc", where: { locale: $locale }) {
        publishedAt
        id
        slug
        title
        tags {
          ...postTags
        }
      }

      #POSTS
      blog_posts(sort: "date:desc", where: { locale: $locale }) {
        id
        locale
        slug
        publishedAt: date
        title
        subtitle
        description
        featured_image {
          url
          height
          width
        }
        tags: post_tags {
          ...postTags
        }
      }
    }
  }

  fragment postTags on PostTag {
    slug
    id
    name
  }
`;
