import { SupportedLanguages } from '@types-app';

interface FeaturedImage {
  url: string;
  height: number;
  width: number;
}

interface PostTag2 {
  slug: string;
  id: string;
  name: string;
}

interface BlogPost {
  id: string;
  language: string;
  slug: string;
  date: string;
  subtitle: string;
  description: string;
  featured_image: FeaturedImage;
  post_tags: PostTag2[];
}

interface PostTag {
  id: string;
  slug: string;
  name: string;
  blog_posts: BlogPost[];
}

interface ProfilePic {
  url: string;
}

interface PersonalInformation {
  full_name: string;
  profile_pic: ProfilePic;
}

export interface TagPageQueryGraphQLResponse {
  postTags: PostTag[];
  personalInformation: PersonalInformation;
}

export type TagPageParams = {
  params: {
    slug: string;
  };
  locale: SupportedLanguages;
};

export type TagPageProps = {
  tag: PostTag;
  personalInformation: PersonalInformation;
};

export interface TagPageStaticPathQuery {
  postTags: Pick<PostTag, 'slug'>[];
}
