import { SupportedLanguages } from '../app';
import { PostsTagApiData } from './post-tags';

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
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

interface Formats {
  thumbnail: Thumbnail;
  large: Large;
  medium: Medium;
  small: Small;
}

interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: any;
  url: string;
  provider_metadata: ProviderMetadata2;
}

interface ProviderMetadata2 {
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
  path: any;
  url: string;
  provider_metadata: ProviderMetadata3;
}

interface ProviderMetadata3 {
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
  path: any;
  url: string;
  provider_metadata: ProviderMetadata4;
}

interface ProviderMetadata4 {
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
  path: any;
  url: string;
  provider_metadata: ProviderMetadata5;
}

interface ProviderMetadata5 {
  public_id: string;
  resource_type: string;
}

interface PostSerie {
  id: string;
  _id: string;
  __v: string;
  slug: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Unsplash {
  authorName: string;
  url: string;
}

export interface PostApiData {
  language: SupportedLanguages;
  status: string;
  post_tags: PostsTagApiData;
  _id: string;
  is_shown: boolean;
  slug: string;
  date: string;
  featured_image_caption: string;
  subtitle: string;
  title: string;
  content: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  featured_image: FeaturedImage;
  id: string;
  post_serie?: PostSerie;
  translation?: PostApiData;
  unsplash?: Unsplash;
}

export type PostsApiData = PostApiData[];
