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
  provider_metadata: ProviderMetadata3;
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
  path?: unknown;
  url: string;
  provider_metadata: ProviderMetadata4;
}

interface Formats {
  thumbnail: Thumbnail;
  medium: Medium;
  small: Small;
}

interface ProfilePic {
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

export interface PersonalInformationApiData {
  _id: string;
  full_name: string;
  phone: string;
  city_country: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  city: string;
  country: string;
  profile_pic: ProfilePic;
  id: string;
}
