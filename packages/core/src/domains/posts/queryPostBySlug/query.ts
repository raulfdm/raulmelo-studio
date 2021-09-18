/**
 * I cannot use `post` schema to fetch this data.
 * The reason is within `post`, I only can filter by post id and I need to
 * fetch by post slug
 */
export const query = `
query BlogPost($where: JSON) {
  posts(where: $where, locale: "all") {
    id
    title
    subtitle
    description
    date
    slug
    unsplash {
      authorName
      url
    }
    content
    featured_image {
      url
      width
      height
    }
    featured_image_caption
    post_tags {
      id
      slug
      name
    }
    series: post_serie {
      name
      posts: blog_posts(sort: "date:asc") {
        id
        copy: serie_copy
        uri: slug
        date
      }
    }
  }
}
`;
