import pick from 'ramda/src/pick';

import { PostApiData, PostsApiData } from '@types-api';

type SanitizedFeaturedImage = Pick<
  PostApiData['featured_image'],
  'width' | 'height' | 'url'
>;

type SanitizedTag = Pick<PostApiData['post_tags'][0], 'id' | 'slug' | 'name'>;
type SanitizedSeries = Pick<
  NonNullable<PostApiData['post_serie']>,
  'id' | 'name' | 'slug'
>;
export type SanitizedPost = Pick<
  PostApiData,
  'language' | 'slug' | 'date' | 'subtitle' | 'title' | 'description' | 'id'
> & {
  featured_image: SanitizedFeaturedImage;
  post_tags: SanitizedTag[];
  post_serie?: SanitizedSeries;
};

const pickPostData = pick([
  'language',
  'slug',
  'date',
  'subtitle',
  'title',
  'description',
  'featured_image',
  'id',
  'post_tags',
  'post_serie',
]);

const pickFeaturedImage = pick(['width', 'height', 'url']);
const pickTag = pick(['slug', 'id', 'name']);
const pickSerie = pick(['slug', 'name', 'post_tags', 'id']);

export function sanitizePosts(posts: PostsApiData) {
  return posts.map((post) => {
    const sanitizedPost = pickPostData(post) as SanitizedPost;

    sanitizedPost.featured_image = pickFeaturedImage(
      sanitizedPost.featured_image,
    );

    sanitizedPost.post_tags = sanitizedPost.post_tags.map(pickTag);
    if (sanitizedPost.post_serie) {
      sanitizedPost.post_serie = pickSerie(sanitizedPost.post_serie);
    }

    return sanitizedPost;
  });
}
