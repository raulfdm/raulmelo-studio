export interface IBlogPostBySlugApiResponse {
  posts: IBlogPostBySlug[];
}

export interface IBlogPostBySlug {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  slug: string;
  unsplash: IBlogPostBySlugUnsplash;
  content: string;
  featured_image: IBlogPostBySlugFeaturedImage;
  featured_image_caption: string;
  post_tags: IBlogPostBySlugPostTag[];
  series: IBlogPostBySlugSeries | null;
}

interface IBlogPostBySlugSeries {
  name: string;
  posts: IBlogPostBySlugSeriesPost[];
}

interface IBlogPostBySlugSeriesPost {
  id: string;
  copy: string;
  uri: string;
  date: Date;
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
