import * as R from 'ramda';

import { PostApiData, PostsApiData } from '@types-api';

type SanitizedFeaturedImage = Pick<
  PostApiData['featured_image'],
  'width' | 'height' | 'url'
>;

type SanitizedTag = Pick<PostApiData['post_tags'][0], 'id' | 'slug' | 'name'>;

export type SanitizedPost = Pick<
  PostApiData,
  'language' | 'slug' | 'date' | 'subtitle' | 'title' | 'description' | 'id'
> & { featured_image: SanitizedFeaturedImage; post_tags: SanitizedTag[] };

const pickPostData = R.pick([
  'language',
  'slug',
  'date',
  'subtitle',
  'title',
  'description',
  'featured_image',
  'id',
  'post_tags',
]);

const pickFeaturedImage = R.pick(['width', 'height', 'url']);
const pickTag = R.pick(['slug', 'id', 'name']);

export function sanitizePosts(posts: PostsApiData) {
  return posts.map((post) => {
    const sanitizedPost = pickPostData(post) as SanitizedPost;

    sanitizedPost.featured_image = pickFeaturedImage(
      sanitizedPost.featured_image,
    );

    sanitizedPost.post_tags = sanitizedPost.post_tags.map(pickTag);

    return sanitizedPost;
  });
}
