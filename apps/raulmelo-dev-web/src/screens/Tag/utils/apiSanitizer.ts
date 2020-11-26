import { PostApiData, PostTagApiData } from '@types-api';
import { pick } from '@utils/ramda';

type SanitizedFeaturedImage = Pick<
  PostApiData['featured_image'],
  'width' | 'height' | 'url'
>;

type SanitizedPost = Pick<
  PostApiData,
  'language' | 'slug' | 'date' | 'subtitle' | 'title' | 'description' | 'id'
> & { featured_image: SanitizedFeaturedImage };

export type SanitizedTag = Pick<
  PostApiData['post_tags'][0],
  'id' | 'slug' | 'name'
> & {
  blog_posts: SanitizedPost[];
};

const pickFeaturedImage = pick(['width', 'height', 'url']);
const pickTag = pick(['slug', 'name', 'blog_posts', 'id']);
const pickPostData = pick([
  'language',
  'slug',
  'date',
  'subtitle',
  'title',
  'description',
  'featured_image',
  'id',
]);

export function sanitizePostTag(tag: PostTagApiData): SanitizedTag {
  const sanitizedTag = pickTag(tag) as SanitizedTag;

  sanitizedTag.blog_posts = sanitizedTag.blog_posts.map((post) => {
    const sanitizedPost = pickPostData(post);

    sanitizedPost.featured_image = pickFeaturedImage(
      sanitizedPost.featured_image,
    );

    return sanitizedPost;
  });

  return sanitizedTag;
}
