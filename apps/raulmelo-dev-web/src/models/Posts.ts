import { PostsApiData } from '@types-api';
import { Post, PostModel } from './Post';

type PostList = PostsApiData;

export type PostsModel = ReturnType<typeof Posts>;

export function Posts(posts: PostList) {
  const _posts = posts.map(Post);

  return {
    allPosts: _posts,

    get singlePosts() {
      return _posts.filter((p) => !p.post_serie);
    },

    /**
     * This getter does not return only all posts which belongs to a serie
     * but the ONLY the first article from each serie found.
     */
    get seriesPosts() {
      const series = {} as { [id: string]: PostModel[] };

      const postsWithSeries = _posts.filter((p) => p.post_serie);

      for (const post of postsWithSeries) {
        const serieId = post!.post_serie!.id!;

        const postsForThisSerie = series[serieId];

        if (typeof postsForThisSerie !== 'undefined') {
          series[serieId].push(post);
        } else {
          series[serieId] = [post];
        }
      }

      const posts: PostModel[] = [];

      for (const serieId in series) {
        /* only the last post */
        const firstPost = series[serieId].slice(-1);
        posts.push(...firstPost);
      }

      return posts;
    },

    postsByLanguage() {
      const portuguesePosts = [] as PostList;
      const englishPosts = [] as PostList;

      for (const post of _posts) {
        if (post.language! === 'en') {
          englishPosts.push(post);
        } else {
          portuguesePosts.push(post);
        }
      }

      return {
        en: Posts(englishPosts),
        pt: Posts(portuguesePosts),
      };
    },
  };
}
