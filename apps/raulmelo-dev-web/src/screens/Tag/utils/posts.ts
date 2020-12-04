import { SupportedLanguages } from '@types-app';
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

type SanitizedTag = Pick<
  PostApiData['post_tags'][0],
  'id' | 'slug' | 'name'
> & {
  blog_posts: SanitizedPost[];
};

export function sortTagPosts(tag: SanitizedTag) {
  const newTag = { ...tag };

  function sortPostsByDateDesc() {
    return newTag.blog_posts.sort(
      (prev, curr) =>
        new Date(curr.date).getTime() - new Date(prev.date).getTime(),
    ) as PostApiData[];
  }

  newTag.blog_posts = sortPostsByDateDesc();

  return newTag;
}

export function filterTagPostsFromLocale(locale: SupportedLanguages) {
  return (tag: SanitizedTag) => {
    const newTag = { ...tag };

    newTag.blog_posts = newTag.blog_posts.filter(
      (post) => post.language === locale,
    );

    return newTag;
  };
}

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
