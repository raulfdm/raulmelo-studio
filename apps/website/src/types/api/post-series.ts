interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

interface ProviderMetadata2 {
  public_id: string;
  resource_type: string;
}

interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
  provider_metadata: ProviderMetadata2;
}

interface ProviderMetadata3 {
  public_id: string;
  resource_type: string;
}

interface Large {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
  provider_metadata: ProviderMetadata3;
}

interface ProviderMetadata4 {
  public_id: string;
  resource_type: string;
}

interface Medium {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
  provider_metadata: ProviderMetadata4;
}

interface ProviderMetadata5 {
  public_id: string;
  resource_type: string;
}

interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
  provider_metadata: ProviderMetadata5;
}

interface Formats {
  thumbnail: Thumbnail;
  large: Large;
  medium: Medium;
  small: Small;
}

interface FeaturedImage {
  _id: string;
  name: string;
  alternativeText: string;
  caption: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  width: number;
  height: number;
  url: string;
  provider_metadata: ProviderMetadata;
  formats: Formats;
  provider: string;
  related: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface PostSeriesBlogPost {
  language: string;
  status: string;
  post_tags: string[];
  _id: string;
  is_shown: boolean;
  slug: string;
  date: string;
  subtitle: string;
  serie_copy: string;
  title: string;
  content: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  featured_image: FeaturedImage;
  post_serie: string;
  id: string;
}

export interface PostSerieApiData {
  _id: string;
  slug: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  blog_posts: PostSeriesBlogPost[];
  id: string;
}

export type PostsSerieApiData = PostSerieApiData[];
