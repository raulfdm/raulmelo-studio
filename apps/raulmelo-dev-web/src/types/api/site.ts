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
  path?: unknown;
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
  path?: unknown;
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
  path?: unknown;
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
  path?: unknown;
  url: string;
  provider_metadata: ProviderMetadata5;
}

interface Formats {
  thumbnail: Thumbnail;
  large: Large;
  medium: Medium;
  small: Small;
}

interface SeoImage {
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

export interface SiteApiData {
  _id: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  seo_image: SeoImage;
  id: string;
}
