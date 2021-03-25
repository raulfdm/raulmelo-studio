import { SupportedLanguages } from '@types-app';

export interface FeaturedImage {
  width: number;
  height: number;
  url: string;
}

export interface PostSerie {
  slug: string;
  name: string;
  id: string;
}

export interface PostTag {
  slug: string;
  id: string;
  name: string;
}

export interface Post {
  id: string;
  language: SupportedLanguages;
  slug: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  featured_image: FeaturedImage;
  post_serie: PostSerie;
  post_tags: PostTag[];
}

export interface Instagram {
  url: string;
  display_name: string;
}

export interface LinkedIn {
  url: string;
  display_name: string;
}

export interface Twitter {
  url: string;
  display_name: string;
}

export interface Github {
  url: string;
  display_name: string;
}

export interface Social {
  instagram: Instagram;
  linkedIn: LinkedIn;
  twitter: Twitter;
  github: Github;
}

export interface ProfilePic {
  url: string;
}

export interface PersonalInformation {
  full_name: string;
  profile_pic: ProfilePic;
}

export interface BlogPageGraphQLResponse {
  posts: Post[];
  social: Social;
  personalInformation: PersonalInformation;
}

export type HomePageProps = BlogPageGraphQLResponse & {
  locale: SupportedLanguages;
  pageNumber: number;
  numberOfPages: number;
};
