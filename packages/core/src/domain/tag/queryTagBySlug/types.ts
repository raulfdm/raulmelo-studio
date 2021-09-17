export interface ITagBySlugApiResponse {
  postTags: ITagBySlugPostTag[];
}

export interface ITagBySlugPostTag {
  id: string;
  slug: string;
  name: string;
  til_posts: ITagBySlugTilPost[];
  blog_posts: ITagBySlugBlogPost[];
}

export interface ITagBySlugTilPost {
  publishedAt: Date;
  id: string;
  slug: string;
  title: string;
  tags: ITagBySlugTag[];
}

export interface ITagBySlugBlogPost {
  id: string;
  locale: string;
  slug: string;
  publishedAt: Date;
  title: string;
  subtitle: string;
  description: string;
  featured_image: ITagBySlugFeaturedImage;
  tags: ITagBySlugTag[];
}

interface ITagBySlugFeaturedImage {
  url: string;
  height: number;
  width: number;
}

interface ITagBySlugTag {
  slug: string;
  id: string;
  name: string;
}
