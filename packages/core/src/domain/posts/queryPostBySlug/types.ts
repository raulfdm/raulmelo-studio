export interface IBlogPostBySlugApiResponse {
  posts: IBlogPostBySlug[];
}

export interface IBlogPostBySlug {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: Date;
  slug: string;
  unsplash: IBlogPostBySlugUnsplash;
  content: string;
  featured_image: IBlogPostBySlugFeaturedImage;
  featured_image_caption: string;
  post_tags: IBlogPostBySlugPostTag[];
  series: null;
}

interface IBlogPostBySlugFeaturedImage {
  url: string;
  width: number;
  height: number;
}

interface IBlogPostBySlugPostTag {
  id: string;
  slug: string;
  name: string;
}

interface IBlogPostBySlugUnsplash {
  authorName: string;
  url: string;
}
